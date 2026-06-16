FROM oven/bun:latest
#include

WORKDIR /app

#directory

ENV NODE_ENV=production

COPY package.json bun.lock ./
RUN bun install --omit=dev

COPY .next ./.next
COPY public ./public

EXPOSE 3000


#run commands
CMD ["bun", "start"]