# official Node.js image
FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies separately
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app (if needed — not needed for pure Express app usually)
# RUN npm run build

# Ensure uploads folder exists
RUN mkdir -p uploads

# Expose app port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]


# docker build -t my-app .
# docker run -p 3000:3000 my-app
# docker run -p 3000:3000 -v $(pwd):/app my-app
# docker run -p 3000:3000 -v $(pwd):/app my-app --env-file .env
# docker run -p 3000:3000 -v $(pwd):/app my-app --env-file .env --network host
# docker run -p 3000:3000 -v $(pwd):/app my-app --env-file .env --network host --rm
# docker run -p 3000:3000 -v $(pwd):/app my-app --env-file .env --network host --rm --name my-app