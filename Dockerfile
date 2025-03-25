FROM dockerhub.docker.artifactory.viasat.com/node:20-alpine AS os-deps

WORKDIR /app

RUN npm install -g typescript pnpm

COPY package*.json pnpm* .

RUN pnpm install --frozen-lockfile

#Build stage
FROM os-deps AS build

WORKDIR /app

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
