FROM node:18-alpine
ARG VERSION
ENV VERSION=${VERSION:-development}
COPY . .
RUN yarn install --frozen-lockfile
CMD yarn start