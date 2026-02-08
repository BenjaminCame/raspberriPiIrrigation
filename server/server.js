import { createServer } from "http";
import { setupWSServer } from "./irrigationWSServer.js";
import { setupHttpServer } from "./irrigationhttpServer.js";

const server = createServer();
const PORT = 3000;

setupWSServer(server);
setupHttpServer(server);


server.listen(PORT,() => {
    console.log(`Root server Listening on ${PORT}`)
})