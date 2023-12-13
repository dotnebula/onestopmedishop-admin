FROM node:18.14.2-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install  --force
COPY . .
RUN npm run build --prod

# Serve Application using Nginx Server
FROM nginx:latest AS ngi
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/onestopmedishop-admin/ /usr/share/nginx/html
EXPOSE 80
