# build environment
FROM node:14.17-alpine
ARG PORT
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Install Python
RUN apk --no-cache add --virtual .builds-deps build-base python3
# install Git
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --immutable --immutable-cache --check-cache --silent
RUN yarn add react-scripts@3.4.1 -g --silent
# add app
COPY . ./
# run build
RUN npm run build
# start app
CMD ["npm","start"]