FROM oven/bun:latest
#include

WORKDIR /app

#directory
#

COPY package.json bun.lock ./
RUN bun install --omit=dev

COPY .next ./.next
COPY public ./public
COPY .env.local ./ 


EXPOSE 3000


#run commands
CMD ["bun", "start"]