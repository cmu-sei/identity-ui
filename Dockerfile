#
#multi-stage target: dev
#
FROM node as dev
ARG commit
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN $(npm bin)/ng build --prod --output-path /app/dist
RUN sed -i s/##COMMIT##/"$commit"/ /app/dist/assets/settings.json && \
    echo "$commit" > /app/dist/commit.txt

CMD ["npm", "serve"]

#
#multi-stage target: production
#
FROM nginx:alpine
WORKDIR /var/www
COPY --from=dev /app/dist .
COPY --from=dev /app/LICENSE.md LICENSE.md
COPY --from=dev /app/nginx-static.conf /etc/nginx/conf.d/default.conf
COPY --from=dev /app/nginx-basehref.sh /docker-entrypoint.d/90-basehref.sh
RUN chmod +x /docker-entrypoint.d/90-basehref.sh
EXPOSE 80
