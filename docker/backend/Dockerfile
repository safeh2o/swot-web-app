FROM node:20.9.0-alpine as build

WORKDIR /app
COPY ./package.json ./yarn.lock ./.yarnrc.yml ./
COPY ./server/package.json ./server/
RUN npm i -g corepack
RUN corepack enable
RUN yarn

COPY ./server/ ./server
RUN yarn workspace server build

EXPOSE 3000
CMD ["yarn", "workspace", "server", "start"]
