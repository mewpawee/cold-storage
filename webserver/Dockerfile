<<<<<<< Updated upstream
FROM node:10.21-alpine

ARG BUILD_ENV

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
=======
FROM httpd:2.4
COPY ./dist/ /usr/local/apache2/htdocs/
>>>>>>> Stashed changes

