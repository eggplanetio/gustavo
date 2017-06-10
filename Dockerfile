FROM node:8-alpine
MAINTAINER briangonzalez

ENV NODE_ENV production

# Create app directory & copy package.json.
RUN mkdir -p /app
COPY package.json /app/package.json

WORKDIR /app
RUN npm install

# Copy app files & build.
COPY . /app
ONBUILD COPY . /app

# Expose the app port.
EXPOSE 3000

CMD ["npm", "start"]
