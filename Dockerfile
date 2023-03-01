FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

EXPOSE 3006

CMD ["npm", "run", "serve", "--", "-p", "3006"]
