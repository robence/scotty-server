# base image
FROM node:12.2.0-alpine

# ENV NODE_ENV production
ENV NODE_ENV development

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY ["package.json", "package-lock.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 5000
CMD npm start