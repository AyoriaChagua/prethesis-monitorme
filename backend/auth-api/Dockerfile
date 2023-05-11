FROM node:18

WORKDIR /home/node/app

COPY package*.json ./
COPY src/ ./src/

RUN npm install 

EXPOSE 4000

CMD [ "npm", "start" ]
