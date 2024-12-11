# Use an official Node.js runtime as a base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./ 

# Install dependencies using npm (since you're using npm)
RUN npm install

# Copy the rest of the application files (after installing dependencies)
COPY . . 

# Expose the port the backend runs on (5000 in your case)
EXPOSE 5000

# Set the default command to start the application
CMD ["node", "index.js"]
