# The first stage
# Build React static files
FROM node:20.11.0-alpine as build

WORKDIR /app
COPY ./package.json ./yarn.lock ./.yarnrc.yml ./
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/
RUN npm i -g corepack
RUN corepack enable
RUN yarn

COPY ./client/ ./client
COPY ./server/ ./server
ARG VITE_GTAG
ARG VITE_CURRENT_COMMIT_SHA
RUN yarn workspace client build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/client/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
