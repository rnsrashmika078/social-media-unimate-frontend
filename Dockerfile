FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN bun install --omit=dev

COPY .next ./.next
COPY public ./public

EXPOSE 3000


#run commands
CMD ["bun", "start"]