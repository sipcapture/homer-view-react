FROM node:8.6.0-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build
USER node

CMD [ "npm", "start" ]
