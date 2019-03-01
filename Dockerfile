FROM node:8.6.0-alpine

# Set a working directory
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

# Run the container under "node" user by default
USER node

CMD [ "node", "scripts/start.js" ]
