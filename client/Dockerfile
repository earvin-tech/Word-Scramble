FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
COPY public/health/index.html /usr/share/nginx/html/health.html
CMD ["nginx", "-g", "daemon off;"]
