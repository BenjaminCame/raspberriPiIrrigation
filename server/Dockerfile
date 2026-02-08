FROM node:bookworm

WORKDIR /app

COPY package-lock.json package.json irrigators.json server.js irrigationWSServer.js irrigationhttpServer.js ./

RUN npm install

CMD ["node","server.js"]