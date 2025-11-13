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

# Expose port (default for most frameworks)
EXPOSE 3001

# Run the dev server
CMD ["npm", "run", "dev"]
