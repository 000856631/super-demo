FROM node:7.2.1

RUN mkdir -p /myproject
WORKDIR /myproject

# ENV REDIS_PORT 6379
# ENV REDIS_PORT_6379_TCP_ADDR localhost
# ENV REDIS_PORT_6379_TCP_PORT 6379
# ENV REDIS_PASSWORD ""

COPY . /myproject
EXPOSE 3000

CMD ["node","./bin/www"]
