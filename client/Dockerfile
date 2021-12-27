FROM node:16.13.1

# Set app directory
WORKDIR /webbylab_test

# add `/app/node_modules/.bin` to $PATH
ENV PATH /webbylab_test/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY package-lock.json ./
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install -s (or --silent)


# Bundle app source
COPY . ./

# start app
CMD ["npm", "start"]
