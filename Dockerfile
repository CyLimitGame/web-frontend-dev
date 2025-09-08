# Build BASE
FROM node:16-alpine as deps
RUN apk add --no-cache libc6-compat
RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts

# Build Image
FROM node:16-alpine AS build
RUN apk add --no-cache libc6-compat
RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
ARG NEXT_FILE_ENV=production
ENV NEXT_FILE_ENV=$NEXT_FILE_ENV
COPY . .
COPY ./.env.$NEXT_FILE_ENV ./.env.production

RUN yarn build

FROM node:16-alpine AS runner
RUN apk add --no-cache libc6-compat
RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["yarn", "start"]
