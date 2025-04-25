FROM node:20-alpine as build

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

# Pass environment variables at build time to create static files with correct API URL
ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
