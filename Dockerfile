FROM node:22-alpine as build
RUN apk add git
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules package-lock.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
