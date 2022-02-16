FROM node:alpine AS buildserver

WORKDIR /app

COPY . .

# take to production
RUN npm run build 


FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=buildserver /app/build .

CMD ["nginx", "-g", "daemon off;"]