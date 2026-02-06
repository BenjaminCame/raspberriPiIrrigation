const { createServer } = require('node:http');
const fs = require('fs');
const WebSocket = require('ws');
const readline = require('node:readline');
const { start } = require('node:repl');

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

// function recursiveAsyncReadLine(socket){
//     rl.question('Command: ', (answer) => {
//     if (answer === 'exit') {
//       console.log('Exiting CLI. Goodbye!');
//       rl.close(); // Closes the interface and exits
//     }
//     socket.send(answer);
//     console.log(`Got it! Your answer was: "${answer}"`);
//     recursiveAsyncReadLine(socket); // Calls the function again to ask a new question
//   });
// }

// Connection Event Handler
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.send('welcome to the websocket server');

    ws.on('message', (message) => {
        console.log(`received: ${message}`);
        //echo the message back to client
    });
    // recursiveAsyncReadLine(ws);

    ws.on('close', () => {
        console.log('Client disconneced')
    })
})