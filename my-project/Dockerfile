FROM node:22-alpine AS build

WORKDIR /app

ARG BOT_USERNAME
ARG BACKEND_URL
ARG YMAPS_API_KEY

ENV VITE_BOT_USERNAME=$BOT_USERNAME
ENV VITE_BACKEND_URL=$BACKEND_URL
ENV VITE_YMAPS_API_KEY=$YMAPS_API_KEY

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80