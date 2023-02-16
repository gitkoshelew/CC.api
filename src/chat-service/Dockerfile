FROM node:18.12-alpine

WORKDIR /chat

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start:dev"]
