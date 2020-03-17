#this file context is from root folder
FROM node:12.16.1
RUN npm install -g nodemon
RUN mkdir /app
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
COPY . /app

EXPOSE 3000

CMD ["yarn", "dev"]