FROM node:18-alpine AS modules
WORKDIR /app
COPY . .
RUN npm ci && npm run build && \
adduser -u 1002 -D appuser appuser


FROM node:18-alpine AS production
LABEL org.opencontainers.image.source="https://github.com/spectrocloud/hello-universe"
LABEL org.opencontainers.image.description "A Spectro Cloud demo application intended for learning and showcasing products."

WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 8080
ENV API_URI ""
ENV API_VERSION 1

COPY --from=modules /etc/passwd /etc/passwd
COPY --from=modules /etc/group /etc/group
COPY --from=modules --chown=appuser:appuser /home/appuser/ /home/appuser/
COPY --from=modules --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=modules --chown=appuser:appuser /app/build ./build
COPY --from=modules --chown=appuser:appuser /app/package.json ./package.json
COPY --from=modules --chown=appuser:appuser /app/start.sh /usr/bin/
RUN apk update && apk upgrade && apk add --no-cache bash && \
chmod +x /usr/bin/start.sh

USER appuser
EXPOSE 8080

CMD [ "sh", "-c", "/usr/bin/start.sh" ]