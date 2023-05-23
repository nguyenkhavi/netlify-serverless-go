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
#  install node_modules for each package in packages folder
COPY packages/rpc/package.json packages/rpc/package.json
RUN pnpm i --prod
COPY . .
RUN pnpm run generate

# Add lockfile and package.json's of isolated subworkspace
FROM node:18-alpine AS installer
RUN corepack enable
WORKDIR /app

# First install the dependencies (as they change less often)
COPY packages/ packages/
COPY --from=builder /app/apps/api/ apps/api/
COPY --from=builder /app/node_modules node_modules
# copy node_modules for each package in packages folder
COPY --from=builder /app/packages/rpc/node_modules /app/packages/rpc/node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/tsconfig.base.json tsconfig.base.json
CMD pnpm nx start api
