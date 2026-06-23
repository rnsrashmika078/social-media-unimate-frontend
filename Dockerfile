# FROM oven/bun:latest

# WORKDIR /app


# COPY package.json bun.lock ./
# RUN bun install --omit=dev

# COPY .next ./.next
# COPY public ./public


# EXPOSE 3000


# #run commands
# CMD ["bun", "start"]


FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY .next ./.next
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]