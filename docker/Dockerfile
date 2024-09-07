FROM node:20 AS base
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
# For Dev 
RUN apt-get update
RUN apt-get install -yqq openssh-server daemonize dbus-user-session
RUN mkdir /var/run/sshd
RUN ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa
RUN mkdir -p ~/.ssh && cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys

# Install nest CLI
RUN bun install --global @nestjs/cli
