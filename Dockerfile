FROM node:18.12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["yarn", "start:dev"]