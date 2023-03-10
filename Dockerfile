#
#multi-stage target: dev
#
FROM node:18 as dev
ARG commit
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN $(npm root)/.bin/ng build identity-ui -c production --output-path /app/dist

CMD ["npm", "serve"]

#
#multi-stage target: production
#
FROM nginx:alpine
WORKDIR /var/www
ENV COMMIT=$commit
COPY --from=dev /app/dist .
COPY --from=dev /app/LICENSE.md LICENSE.md
COPY --from=dev /app/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY --from=dev /app/nginx-basehref.sh /docker-entrypoint.d/90-basehref.sh
RUN chmod +x /docker-entrypoint.d/90-basehref.sh
EXPOSE 80
