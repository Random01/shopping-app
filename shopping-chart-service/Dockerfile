FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY /dist .
EXPOSE 3001
CMD [ "node", "index.js" ]