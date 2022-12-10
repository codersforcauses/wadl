# Firebase Instructions

---


This document will include instructions on all things firebase in the Western Australian Debating Legue!!

## Firebase Steps

---

This section will include steps on how to setup firebase for the WADL project 

<em>**Note**</em>: after running most of the yarn commands that involve using the emulators, please run:
> yarn emu:stop



If you want to start the emulators just by themselves to see if they work, run:
> yarn firebase

If you want to run the wadl project with the emulators, run:
> yarn dev:emu

To run the project with the cloud service, run:
> yarn dev

If you want to kill the ports that the emulators use, run:
> yarn emu:stop

## Firebase Emulators 

---
This project will inlcude the emulators for

1. Firestore 
2. Authentication 
3. Functions
4. Storage

The project will get the use of extensions added in later, when it becomes more 
definitive the extenions we need, these can be installed by running the command 
> firebase ext:install <publisherId/extensionId>

The way that the emulators have been set up is to be in the base wadl directory, before running anything make sure to run:
> yarn install 

Then make sure that there is a variable in the .env file that triggers the dev mode, this will be:
> NUXT_PUBLIC_FIREBASE_MODE="dev"

Now that all the required packages have been installed, you can run: 
> yarn firebase

This will provide you with a gui of what is going on like your using the online version, to access this please follow the link that comes up in your terminal. If the link doesn't show in the terminal, this is the default link:
> localhost:4000

Now you can run the basic yarn command to start the project:
> yarn dev

I have added in the basic Auth and Firestore emualtors, and will decide later if any more need to be added

## Firebase Killswitch

---
