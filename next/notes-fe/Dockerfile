FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy file package.json dan install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy semua file project
COPY . .

ENV NEXT_SKIP_LIGHTNINGCSS=1

# Build Next.js app
RUN npm run build

# Jalankan Next.js
CMD ["npm", "start"]

EXPOSE 3000
