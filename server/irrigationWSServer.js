import { WebSocketServer } from 'ws';
import readline from 'node:readline';
import { createRequire } from "module";
import { readIrrigators } from "./irrigationhttpServer.js"

const require = createRequire(import.meta.url);
const irrigationNozzles = require("./irrigators.json");

const wss = new WebSocketServer({ noServer: true });

export function broadcastIrrigationStatus(){
    let irrigationStatus = readIrrigators();
    wss.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN ){
            client.send(JSON.stringify(irrigationStatus));
        };
    });
};

export function setupWSServer(server){
    server .on('upgrade', (request,socket,head) => {
        wss.handleUpgrade(request,socket,head, (ws) => {
            wss.emit('connection',ws, request);
        });
    });

    wss.on('connection', (ws) => {
        console.log('New client connected');

        ws.send('welcome to the websocket server');
        //TODO sending sprinkler dater in plain text not good practise
        ws.send(JSON.stringify(irrigationNozzles))

        ws.on('message', (message) => {
            console.log(`received: ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconneced')
        })
    })

    
    let rl;
    if (process.stdin.isTTY){
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    startCLI();
    }

    function startCLI() {
        rl.question('Command: ', (answer) => {
            if (answer === 'exit') {
                console.log('Exiting CLI. Goodbye!');
                rl.close();
                process.exit(0);
            }

            // send command to all connected WebSocket clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(answer);
                }
            });

            console.log(`Sent command: "${answer}"`);
            startCLI(); // continue the loop
        });
    }
}
