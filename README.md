# CC.api

Collaborative Code API

- NodeJS v 18.12.1
- NestJS v 9.1.5

mockup https://www.figma.com/file/woKRnr0V6wEzOsCTu3pA0U/Live-Coding-App?node-id=1%3A3

description https://docs.google.com/document/d/1nRaXjmNPGJMoNiC37SxKDyMah8exJpWiYUTCvTsESsM/edit

questions sources: https://github.com/learning-zone/css-basics?ref=opensource https://github.com/sudheerj/reactjs-interview-questions https://github.com/sudheerj/javascript-interview-questions#how-to-invoke-an-iife-without-any-extra-brackets https://github.com/Devinterview-io/react-native-interview-questions https://github.com/huynq-tp/nodejs-interview-questions https://github.com/kansiris/SQL-interview-questions https://github.com/learning-zone/docker-and-kubernetes-basics https://github.com/Devinterview-io/redis-interview-questions

## About API

### Before you start

1. Install <a href="https://www.docker.com/">Docker</a> on your local machine.
2. Clone the repository to your local machine, open the `release_candidate branch`, and paste the `.env` file into the root of the project.
3. In the `src` folder, find the `chat-service` folder. Inside this folder, also create an `.env` file and write the code in this file as shown in `README.md`. For example, `CHAT_SERVICE_PORT=8008` (any free port).
4. Open a terminal in the project folder and enter the following commands: `yarn` and after that `npx sequelize-cli db:migrate`.

### Docker

1. Open `Desktop App - Docker` on your local machine.
2. Create a `.dockerignore` file in the root directory and write the `/node_modules` dependency in it.
3. Open the terminal in the project folder and write the following commands in sequence: `docker-compose build` and after its execution `docker-compose up`.
