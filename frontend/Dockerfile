FROM node:alpine3.11 as build

ARG API_URL="apiUrl: 'http://localhost:8000/api'"

WORKDIR /usr/src/server
COPY . .
RUN npm install && \
    sed -i -e "/apiUrl:/c\\${API_URL}" \
      ./src/environments/environment.ts && \
    npm run build --prod  && \
    cd dist && \
    mv $(ls -d */|head -n 1) /app


FROM nginx:1.21-alpine
EXPOSE 8000
COPY --from=build /app /usr/share/nginx/html/app
