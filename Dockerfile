# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Stage 2: Production app (backend + serve frontend)
FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY backend ./backend
COPY --from=frontend-build /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "backend/server.js"]
