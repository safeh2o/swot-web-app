# The first stage
# Build React static files
FROM node:20.9.0-alpine as build
WORKDIR /app/client
COPY ./client/package.json ./
COPY ./client/package-lock.json ./
RUN npm ci
COPY ./client/ ./
ARG VITE_GTAG
ARG VITE_CURRENT_COMMIT_SHA
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/client/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
