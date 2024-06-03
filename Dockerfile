FROM node:18.3.0-alpine3.14

# Create app directory
WORKDIR /api

# Copy everything to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 443

# Serve the app
CMD ["npm", "start"]