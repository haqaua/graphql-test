FROM node:16.0.0

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

RUN npm run start:dev
