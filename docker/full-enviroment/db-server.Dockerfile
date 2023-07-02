FROM mysql:8-debian

ENV MYSQL_ROOT_PASSWORD=example
ENV MYSQL_DATABASE=entto-blog
ENV MYSQL_USER=example
ENV MYSQL_PASSWORD=example

WORKDIR /docker-entrypoint-initdb.d
# COPY ./db/schema.sql ./
COPY db/fix-user-privilige.sql ./

EXPOSE 3306
