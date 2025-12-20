FROM node:24.11.0-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --immutable --production
COPY .next .next
COPY public public
COPY next.config.ts next.config.ts
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
