FROM node:18.12-alpine

WORKDIR /chat

COPY package*.json ./

RUN yarn

COPY . .

CMD ["yarn", "start:dev1"]
