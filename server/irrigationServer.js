const { createServer } = require('node:http');
const fs = require('fs');
const WebSocket = require('ws');

const hostname = 'local';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Irrigation Server is up and running');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Irrigaiton Server running at http://${hostname}:${port}/`);
});
  

      

//creating a websocket on port 5000
const wss = new WebSocket.Server({port:8000});

console.log('websocket server is running on ws://localhost:8000');

// Connection Event Handler
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.send('welcome to the websocket server');

    ws.on('message', (message) => {
        console.log(`received: ${message}`);
        //echo the message back to client
        ws.send('Server received: ${message}');
    });

    ws.on('close', () => {
        console.log('Client disconneced')
    })
})