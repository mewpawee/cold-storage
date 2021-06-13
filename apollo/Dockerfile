FROM node:14.17-alpine

ARG BUILD_ENV

RUN mkdir -p /usr/src/app
COPY package*.json /usr/src/app/
RUN cd /usr/src/app/ && npm install
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 4000

CMD [ "npm", "run", "start" ]