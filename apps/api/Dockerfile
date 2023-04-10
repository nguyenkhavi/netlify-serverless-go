FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN corepack enable
COPY package.json package.json
COPY apps/api/package.json apps/api/package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY pnpm-workspace.yaml pnpm-workspace.yaml 
COPY packages packages
RUN pnpm i --prod
COPY . .
RUN pnpm run generate

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/packages/ packages/
COPY --from=builder /app/apps/api/ apps/api/
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/tsconfig.base.json tsconfig.base.json
RUN corepack enable
CMD pnpm nx start api
