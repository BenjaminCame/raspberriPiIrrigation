import { createServer } from "http";
import { setupWSServer } from "./irrigationWSServer.js";
import { setupHttpServer } from "./irrigationhttpServer.js";
import  dotenv from "dotenv";

dotenv.config();

const server = createServer();
const PORT = process.env.LOCAL_PORT;
const LOCAL_IP = process.env.LOCAL_IP

setupWSServer(server);
setupHttpServer(server);


server.listen(PORT,"0.0.0.0",() => {
    console.log(`Root server Listening on ${PORT} IP ${LOCAL_IP}`)
})