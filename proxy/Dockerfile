FROM node:8.6.0-alpine

WORKDIR /app
COPY . .
RUN npm install

USER node
CMD [ "npm", "start" ]
