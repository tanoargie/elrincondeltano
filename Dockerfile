FROM node:18-alpine as setup
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install -g node-gyp
COPY package*.json /app
RUN npm ci --production

FROM setup as builder
COPY . /app
RUN npm run build

FROM nginx:stable-alpine as runner
COPY --from=builder /app/public /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
