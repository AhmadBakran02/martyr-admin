# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy rest of the project
COPY . .

# Build Next.js
RUN npm run build

# Set Next.js port to 3001
ENV PORT=3001

# Expose the port
EXPOSE 3001

# Start production server
CMD ["npm", "start"]
