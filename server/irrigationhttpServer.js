import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URL } from "node:url";
import { broadcastIrrigationStatus } from './irrigationWSServer.js'
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const { Gpio } = require('onoff')
import dotenv from 'dotenv'


dotenv.config()

const filePath = path.resolve('./irrigators.json');

const frontLawn = new Gpio(2, 'out');

export function readIrrigators() {
    try {
        const data = fs.readFileSync(filePath, "utf-8"); // read as string
        return JSON.parse(data); // convert to JS object
    } catch (err) {
        console.error("Error reading JSON file:", err);
        return {}; // fallback
    }
}

function writeIrrigators(data){
    try {
        fs.writeFileSync(filePath, JSON.stringify(data,null, 2),"utf-8");
    } catch (err) {
        console.error("Error writing JSON file", err);
    }
}

//TODO investigate a better method for this
const toBoolean = v => {
    if (v === undefined) return false;
    if (v === true || v === false) return v;
    if (v == 1) return true;
    if (v == 0) return false;
    if (typeof v === "string") return v.toLowerCase() === "true";
    return false;
};

function updateZoneStatus(res, id , isActive){

    const irrigationStatus = readIrrigators();

    const zone = irrigationStatus.find(z => z.id === Number(id));

    if(!zone){
        res.end(`Zone with pin ${id} was not found!`);
    }

    zone.isActive = toBoolean(isActive);//TODO investigate a cleaner method to passing boolean around
    writeIrrigators(irrigationStatus);
    broadcastIrrigationStatus();
}


export function setupHttpServer(server){
    server.on('request', (req, res) => {
    // Set common CORS headers for all requests
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all origins TODO have only my website as origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // allowed headers

    //Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.writeHead(204); // No Content
      res.end();
      return; // stop further processing
    }
    const REQUESTERS_IP = req.headers["x-forward-for"] || req.socket.remoteAddress;
    console.log("Request IP:", REQUESTERS_IP)

    if( req.method === 'GET'){
        if (req.url === '/status') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ status: 'ok' }));
        } else if (req.url === '/component/status'){
            const irrigators = readIrrigators();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(irrigators, null, 2));
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('HTTP Server Running');
        }
    } else if (req.method === "POST"){
        console.log("req.headers.host", req.headers.host);  
        const myURL = new URL(req.url, `http://${REQUESTERS_IP}`);
	    
        if(myURL.pathname === "/sprinklerStatus"){
            let body = "";

            req.on("data", chunk => {
                body += chunk.toString();
            })
            req.on("end", () => {
                try {
                    const parsedBody = JSON.parse(body);
                    const id = parsedBody.id;
                    const isActive = parsedBody.isActive;
			        console.log("here i am")
                    frontLawn.writeSync(frontLawn.readSync() === 0 ? 1:0);
                    updateZoneStatus(res, id, isActive);
                    res.end(`Attempted to change ${id} status to ${isActive}`)
                } catch (err) {
                    console.log(err)
                    res.writeHead(400, {"Content-Type": "text/plain"});
                    res.end("invalid Json in request body")
                } 
            })
        } else {
            res.writeFileSync(404, {"Content-Type": "test/plain"})
            res.end('error POST request not found')
        }     
    }
  });
}
