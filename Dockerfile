FROM node:18.14-alpine as builder
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install -g node-gyp
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3006
CMD ["npm", "run", "serve", "--", "-p", "3006", "-H", "0.0.0.0"]
