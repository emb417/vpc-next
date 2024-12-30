#stage 1
FROM node:16.14 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run prod-build

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/web /usr/share/nginx/html

EXPOSE 80