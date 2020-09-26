FROM node:10.21-alpine

ARG BUILD_ENV

RUN mkdir -p /usr/src/app
COPY package*.json /usr/src/app/
RUN cd /usr/src/app/ && npm install
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 3000

CMD [ "npm", "run", "dev" ]