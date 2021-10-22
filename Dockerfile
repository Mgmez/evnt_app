FROM node:10 as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npx eslint --fix .
RUN npm run build

FROM steebchen/nginx-spa:stable

COPY --from=builder app/dist/ /app

EXPOSE 80

CMD ["nginx"]
