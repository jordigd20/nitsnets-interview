FROM node:18-alpine3.19

ENV NODE_ENV=development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

ENV PATH=./node_modules/.bin/:$PATH

COPY . .

EXPOSE 3000