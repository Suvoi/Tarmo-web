FROM node:24.11.0-slim
WORKDIR /app
COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile --prefer-offline --verbose
EXPOSE 3000
CMD [ "yarn", "dev" ]