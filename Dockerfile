FROM node:16-alpine as api

WORKDIR /home/node/app

RUN yarn
