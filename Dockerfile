
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173

ENTRYPOINT [ "sh", "-c", "\
  echo VITE_API_URL=${API_URL} > .env && \
  npm run dev \
" ]
