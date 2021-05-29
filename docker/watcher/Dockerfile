# The first stage
# Build React static files
FROM node:13.12.0-alpine as build

WORKDIR /app/client
COPY ./client/package.json ./
COPY ./client/package-lock.json ./
RUN npm ci --silent
COPY ./client/ ./
CMD ["npm", "run", "watch"]
