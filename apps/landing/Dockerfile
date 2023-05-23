FROM node:18-alpine AS runner
WORKDIR /app
RUN yarn global add pnpm
COPY dist/apps/landing/package.json package.json
COPY dist/apps/landing/pnpm-lock.yaml pnpm-lock.yaml
RUN pnpm i
COPY dist/apps/landing/ ./
COPY apps/landing/.env .env
CMD pnpm run start



