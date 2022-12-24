FROM node:lts AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest AS server

COPY --from=builder ./app/dist /usr/share/nginx/html

EXPOSE 3000
