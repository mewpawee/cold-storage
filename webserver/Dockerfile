FROM node:14.17-alpine

#create destionation directory
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

#update and install dependency
RUN apk update && apk upgrade

#copy the app, note .dockerignore
COPY . /usr/src/frontend/
RUN npm install

#build necessery,
RUN npm run build
# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# RUN npm install --global cross-env


EXPOSE 3000

#start the app
CMD [ "npm", "start"]