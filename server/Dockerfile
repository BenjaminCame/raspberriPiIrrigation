FROM node:bookworm

WORKDIR /app

COPY package-lock.json package.json irrigators.json irrigationServer.js ./

RUN npm install

CMD ["node","irrigationServer.js"]