FROM node:18.3.0-alpine3.14

# Create app directory
WORKDIR /api

# set port environment variable
ENV PORT 4433

# Copy everything to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 4433

# Serve the app
CMD ["npm", "start"]