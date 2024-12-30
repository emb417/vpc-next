# Use an official Node runtime as the base image
FROM node:22.12.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Build the app
RUN npm run build

# Expose the port your app runs on
EXPOSE 80

# Command to run the app
CMD [ "npm", "start" ]