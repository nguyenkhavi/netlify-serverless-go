FROM node:18-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN apk update
RUN corepack enable
COPY package.json ./
COPY **/package.json ./
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN pnpm i --prod
RUN pnpm add sharp
COPY . .
RUN pnpm run generate
RUN rm -rf apps && mkdir apps
COPY ./apps/landing ./apps/landing
CMD cd apps/landing && pnpm run start
