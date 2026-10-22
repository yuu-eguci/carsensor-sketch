FROM node:24.22.1-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205

WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts && yarn cache clean

COPY --chown=node:node . .

EXPOSE 8080
CMD ["yarn", "serve", "--host", "0.0.0.0"]
