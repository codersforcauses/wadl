FROM node:16

# java dependencies
RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean; 

# firebase cli
RUN yarn global add firebase-tools

# firebase emulators
RUN firebase setup:emulators:database
RUN firebase setup:emulators:firestore
RUN firebase setup:emulators:pubsub
RUN firebase setup:emulators:storage
RUN firebase setup:emulators:ui

WORKDIR /app
COPY /Firebase ./

WORKDIR /app/functions
RUN npm install

WORKDIR /app
