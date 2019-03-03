FROM node:8.6.0-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm rebuild node-sass && npm run build

USER node
CMD [ "node", "scripts/start.js" ]
