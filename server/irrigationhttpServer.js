import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URL } from "node:url";
import { broadcastIrrigationStatus } from './irrigationWSServer.js'

const filePath = path.resolve('./irrigators.json');

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
    // console.log(data);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data,null, 2),"utf-8");
    } catch (err) {
        console.error("Error writing JSON file", err);
    }
}

function updateZoneStatus(res, id , isActive){

    const irrigationStatus = readIrrigators();

    const zone = irrigationStatus.find(z => z.pin === Number(id));

    if(!zone){
        res.end(`Zone with pin ${id} was not found!`);
    }
    console.log(isActive)
    // const isActive = isActiveStr?.toLowerCase() === "true"; //TODO: equate string type true and false to boolean possibly a better solution (does not work with 0,1)
    // console.log("cats")
    zone.isActive = isActive;
    writeIrrigators(irrigationStatus);
    broadcastIrrigationStatus();
}


export function setupHttpServer(server){
    server.on('request', (req, res) => {
    
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
        const myURL = new URL(req.url, 'http://localhost:3000');
    
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
                    console.log(isActive)
                    updateZoneStatus(res, id, isActive);
                    console.log("baasdhasd")
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