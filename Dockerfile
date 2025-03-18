# Dockerfile for Cypress Tests

# Use the official Cypress image as base
FROM cypress/base:12.1.0

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Run Cypress verify to ensure the installation is complete
RUN npx cypress verify

# Default command to run tests in headless mode
CMD ["npx", "cypress", "run"]
