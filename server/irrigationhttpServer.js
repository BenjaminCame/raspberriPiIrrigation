const http = require('node:http');
const json = require('./irrigators.json') //TODO: this will probably not be the most recent status of the app


const server = http.createServer((req,res) => {
    const { url, method } = req;

    if ( method === 'GET' & url === '/status' ) {
        res.end(JSON.stringify(json))
    }
    else if ( method === 'PUT'){
        if ( url === '/on' ){
            
        }
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`req url = ${url}, method = ${method} \n`);
})

const PORT = 3001;
server.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
})