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
ENV API_URI  ""
ENV API_VERSION 1
ENV TOKEN ""

COPY --from=modules /etc/passwd /etc/passwd
COPY --from=modules /etc/group /etc/group
COPY --from=modules --chown=appuser:appuser /home/appuser/ /home/appuser/
COPY --from=modules --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=modules --chown=appuser:appuser /app/build ./build
COPY --from=modules --chown=appuser:appuser /app/package.json ./package.json
RUN apk update && apk upgrade && apk add --no-cache curl ca-certificates bash

USER appuser
EXPOSE 8080

CMD ["/bin/bash", "-c", "REACT_APP_API_URI=$API_URI REACT_APP_API_VERSION=$API_VERSION REACT_APP_TOKEN=$TOKEN npx react-inject-env set && \
npm run server-prod"]