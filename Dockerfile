FROM alpine:latest
RUN apk add --no-cache nodejs npm


WORKDIR /dist


COPY . /dist


RUN npm install


EXPOSE 3000


ENTRYPOINT ["node"]

CMD ["./dist/server/index.js"]