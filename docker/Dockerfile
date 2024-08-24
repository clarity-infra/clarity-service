FROM node:22 AS base
RUN npm i -g bun
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /dependencies/dev && mkdir -p /dependencies/prod
COPY package.json bun.lockb /dependencies/dev/
COPY package.json bun.lockb /dependencies/prod/

RUN \
  bun i --frozen-lockfile --cwd /dependencies/dev/ && \
  bun i --frozen-lockfile --production --cwd /dependencies/prod/

FROM base AS prerelease
COPY --from=install /dependencies/dev/node_modules node_modules
COPY . .

ENV APP_ENV=production
RUN bun run build

FROM prerelease AS release
ENTRYPOINT [ "bun", "dist/main.js" ]

FROM base AS dev
RUN bun install --global @nestjs/cli
