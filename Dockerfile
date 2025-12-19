# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

ARG VITE_BACKEND_URL
ARG VITE_KEYCLOAK_URL
ARG VITE_KEYCLOAK_REALM
ARG VITE_KEYCLOAK_CLIENT_ID

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL
ENV VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM
ENV VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID

RUN echo "$VITE_BACKEND_URL"
COPY . .
RUN npm run simple-build

# Production stage
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

COPY infrastructure/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
