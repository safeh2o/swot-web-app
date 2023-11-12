FROM node:20.9.0-alpine as build

WORKDIR /app
COPY ./server/package.json ./
COPY ./server/package-lock.json ./
RUN npm ci

COPY ./server/ ./
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
