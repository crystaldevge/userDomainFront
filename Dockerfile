# # Dockerfile (dev version)
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy source files
# COPY . .

# # Open port for Angular dev server
# EXPOSE 4200

# # Start Angular with live reload
# CMD ["npm", "start"]
# # CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "4200", "--disable-host-check"]


# Step 1: Build Angular App
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/<user-management> /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
