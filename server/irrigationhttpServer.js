const http = require('node:http');

const server = http.createServer((req,res) => {
    const { url, method } = req;

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`req url = ${url}, method = ${method} \n`);
})

const PORT = 3001;
server.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
})