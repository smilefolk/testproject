#this file context is from root folder
FROM node:12-alpine

EXPOSE 9999

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

CMD ["yarn", "docker:start"]