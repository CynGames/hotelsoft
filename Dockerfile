# Install dependencies only when needed
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


# Build the app with cache dependencies
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build


# Production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner

# Set working directory
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


# Copy compiled application
COPY --from=builder /app/dist ./dist

# Copy generated Prisma Client
#COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client


CMD [ "node","dist/main" ]



#FROM node:18
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#CMD [ "npm", "run", "start:dev" ]
