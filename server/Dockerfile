FROM node:bookworm

WORKDIR /app

COPY package-lock.json package.json irrigationServer.js ./

RUN npm install

EXPOSE 3000

CMD ["node","irrigationServer.js"]