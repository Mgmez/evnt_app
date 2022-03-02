FROM node:14 as builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM steebchen/nginx-spa:stable

COPY --from=builder app/dist/ /app

EXPOSE 80

CMD ["nginx"]
