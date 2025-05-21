# Dockerfile (dev version)
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Open port for Angular dev server
EXPOSE 4200

# Start Angular with live reload
CMD ["npm", "start"]
# CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "4200", "--disable-host-check"]


# Dockerfile.dev



# FROM node:18
 
# WORKDIR /app
 
# COPY package*.json ./
 
# RUN npm install -g @angular/cli && npm install
 
# # Copy source code (კოდი bind-mount-ითაც დაიმაუნტდება, ამიტომ საკმარისია tsconfig და angular.json)
# COPY angular.json tsconfig.json ./
 
# EXPOSE 4200
 
# CMD ["ng", "serve", "--host", "0.0.0.0"]