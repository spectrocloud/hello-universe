FROM node:18-alpine AS modules
WORKDIR /app
COPY . .
RUN npm ci --only=production && npm run build


FROM node:18-alpine AS production
LABEL org.opencontainers.image.source="https://github.com/spectrocloud/hello-universe"
LABEL org.opencontainers.image.description "A Spectro Cloud demo application intended for learning and showcasing products."

WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=modules /app/node_modules ./node_modules
COPY --from=modules /app/build ./build
COPY --from=modules /app/package.json ./package.json
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app

USER app

EXPOSE 8080

ENV PORT 8080

CMD ["npm", "run", "server-prod"]