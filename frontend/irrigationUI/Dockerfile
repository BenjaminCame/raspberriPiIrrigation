# Use lightweight Node image
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies, including devDependencies (needed for tsc)
RUN npm install --include=dev

# Copy the rest of the project
COPY . .

# Build the project
RUN npm run build

# Install serve globally to serve static files
RUN npm install -g serve

# Expose port
EXPOSE 8000

# Default command
CMD ["serve", "-s", "dist", "-l", "8000"]

