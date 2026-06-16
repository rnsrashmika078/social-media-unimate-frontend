FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY .next ./.next
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]