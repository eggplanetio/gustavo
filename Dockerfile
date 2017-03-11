FROM mhart/alpine-node:7.7.2
MAINTAINER briangonzalez

ENV NODE_ENV production

# Create app directory
RUN mkdir -p /app
COPY . /app

# Copy files.
WORKDIR /app
RUN npm install
RUN ./node_modules/.bin/nuxt build

# Expose the app port
EXPOSE 3000

CMD ["node", "/app/server.js"]
