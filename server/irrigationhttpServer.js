import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const filePath = path.resolve('./irrigators.json');

function readIrrigators() {
    try {
        const data = fs.readFileSync(filePath, "utf-8"); // read as string
        return JSON.parse(data); // convert to JS object
    } catch (err) {
        console.error("Error reading JSON file:", err);
        return {}; // fallback
    }
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
    }
  });
}


// const httpServer = http.createServer((req,res) => {
//     // const { url, method } = req;

//     // if ( method === 'GET' & url === '/status' ) {
//     //     res.end(JSON.stringify(json))
//     // }
//     // else if ( method === 'POST'){
//     //     if ( url === '/sprinker' ){
//     //         urlParams = new URLSearchParams(url)
//     //         id = urlParams.get('id');
//     //         isActive = urlParams.get('isActive')

//     //         console.log(id , isActive)
//     //         res.end(`attempted to change ${id} status to ${isActive}`)
//     //     }
//     // }

//     // res.writeHead(200, { 'Content-Type': 'text/plain' });
//     // res.end(`req url = ${url}, method = ${method} \n`);
// })

// const PORT = 3000;
// server.listen(PORT,() => {
//     console.log(`HTTP Server is running on ${PORT}`);
// })