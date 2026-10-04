FROM node:22-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

USER node
CMD [ "node", "scripts/start.js" ]
