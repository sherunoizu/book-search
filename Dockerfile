FROM nginx:1.22-alpine

WORKDIR /usr/

RUN apk add --update 'nodejs=~16' 'npm=~8'

COPY . .

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

ARG REACT_APP_API_KEY='AIzaSyAdpH9hJufBXm3XctTEma-3uttRl-VQIgY'

COPY package.json /usr/package.json
RUN npm i
RUN npm run build

RUN mv /usr/build/* /usr/share/nginx/html/

EXPOSE 3000