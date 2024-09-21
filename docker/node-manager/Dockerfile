# syntax=docker/dockerfile:1

####################################################################################
FROM node:20-alpine AS base

# set workdir
WORKDIR /usr/src/app

# install glibc to run Bun
RUN if [[ $(uname -m) == "aarch64" ]] ; \
  then \
  # aarch64
  wget https://raw.githubusercontent.com/squishyu/alpine-pkg-glibc-aarch64-bin/master/glibc-2.26-r1.apk ; \
  apk add --no-cache --allow-untrusted --force-overwrite glibc-2.26-r1.apk ; \
  rm glibc-2.26-r1.apk ; \
  else \
  # x86_64
  wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk ; \
  wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub ; \
  apk add --no-cache --force-overwrite glibc-2.28-r0.apk ; \
  rm glibc-2.28-r0.apk ; \
  fi

# install bun
RUN npm install -g bun@1.1.28

####################################################################################
FROM base AS install

# prepare installation path
RUN mkdir -p /dependencies/dev && mkdir -p /dependencies/prod
COPY package.json bun.lockb /dependencies/dev/
COPY package.json bun.lockb /dependencies/prod/

# installation begin
RUN \
  bun i --frozen-lockfile --cwd /dependencies/dev/ && \
  bun i --frozen-lockfile --production --cwd /dependencies/prod/

####################################################################################
# this still not working 
FROM base AS prerelease

COPY --from=install /dependencies/prod/node_modules node_modules
COPY . .

ENV APP_ENV=production
RUN bun run build

FROM prerelease AS release
ENTRYPOINT [ "bun", "dist/main.js" ]

####################################################################################
FROM base AS dev

# Install nest CLI for incase needed
RUN bun install --global @nestjs/cli
