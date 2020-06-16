#
#multi-stage target: dev
#
FROM node as dev
ARG commit
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN $(npm bin)/ng build --prod --baseHref /ui/ --output-path /app/dist
RUN sed -i s/##COMMIT##/"$commit"/ /app/dist/assets/settings.json
CMD ["npm", "serve"]

#
#multi-stage target: production
#
FROM nginx:alpine
WORKDIR /var/www
COPY --from=dev /app/dist ui
COPY --from=dev /app/LICENSE.md ui/LICENSE.md
COPY --from=dev /app/dist/index.html .
COPY --from=dev /app/nginx-static.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
