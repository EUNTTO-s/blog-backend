FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ENV TYPEORM_CONNECTION=mysql
ENV TYPEORM_HOST=host.docker.internal
ENV TYPEORM_USERNAME=example
ENV TYPEORM_PASSWORD=example
ENV TYPEORM_DATABASE=entto-blog
ENV TYPEORM_PORT=4406
ENV TYPEORM_LOGGING=TRUE
ENV PORT=5502
ENV SECRET_KEY=example
ENV HOST_URL=http://localhost:${PORT}
EXPOSE 5502

CMD ["npm", "run", "runserver"]