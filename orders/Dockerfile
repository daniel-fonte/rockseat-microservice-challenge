FROM node:lts-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=PRD

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api

RUN chown api:nodejs .

COPY --chown=api:nodejs . .
COPY --from=deps /app/node_modules ./node_modules

USER api

EXPOSE ${PORT}

ENV PORT=${PORT}
ENV HOST=${HOST}
ENV BROKER_URL=${BROKER_URL}
ENV LOG_LEVEL='info'

ENTRYPOINT [ "npm", "run", "start" ]