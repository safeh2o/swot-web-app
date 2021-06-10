
# The first stage
# Build React static files
FROM node:13.12.0-alpine as build

ARG GOOGLE_ANALYTICS_GTAG
ARG GOOGLE_RECAPTCHA_SITE_KEY
WORKDIR /app/client
COPY ./client/package.json ./
COPY ./client/package-lock.json ./
RUN npm ci
COPY ./client/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/client/public /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
