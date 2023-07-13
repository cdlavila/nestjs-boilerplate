# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the app's source code
COPY . .

# Expose the port on which the NestJS app will run (assuming it's 3000)
EXPOSE 3000

# Start the NestJS app
# CMD ["npm", "run", "start:prod"]

CMD ["sh", "-c", "npm run build && npm run start:prod"]

# Commands
# docker build -t nestjs-app .
# docker run -d --name nestjs-app -p 3000:3000 nestjs-app
# remember the env variables
