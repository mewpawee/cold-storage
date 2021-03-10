FROM node:10.21-alpine

ARG BUILD_ENV

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . /app/

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
