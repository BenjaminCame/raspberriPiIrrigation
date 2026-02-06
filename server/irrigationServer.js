const { createServer } = require('node:http');
const WebSocket = require('ws');
const readline = require('node:readline');
const { stringify } = require('node:querystring');
irrigationNozzles = require('./irrigators.json');

const hostname = 'irrigation-network';
const port = process.env.PORT || 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Irrigation Server is up and running');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Irrigaiton Server running at http://${hostname}:${port}/`);
});
  

      

//creating a websocket on port 5000
const wss = new WebSocket.Server({server});
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



// Connection Event Handler
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.send('welcome to the websocket server');
    //TODO sending sprinkler dater in plain text not good practise 
    ws.send(JSON.stringify(irrigationNozzles))

    ws.on('message', (message) => {
        console.log(`received: ${message}`);
        //echo the message back to client
    });
    // recursiveAsyncReadLine(ws);

    ws.on('close', () => {
        console.log('Client disconneced')
    })
})