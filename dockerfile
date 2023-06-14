# Base image with Node.js installed
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Opening the port that your application will listen on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
