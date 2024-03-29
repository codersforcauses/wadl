# Western Australian Debating League
A progressive web-application to assist the Western Australia Debating League with their seasonal organisation needs.

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

### Local .env file
Download **'env'**, pinned in discord wadl-backend channel. Rename to **'.env'** and place in root directory.  
Alternatively:  
* Create file '.env' in root directory, and copy content of '.env.example' into it 
* Copy environment values from the cfc wadl-backend discord channel into their corresponding values in .env  
* Set NUXT_PUBLIC_FIREBASE_MODE to "dev"  
> If you do not have access to wadl-backend, message an admin of the project.

## Local Server setup
Make sure to install the dependencies:

```bash
# yarn
yarn install
```
## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```
## Production

Build the application for production:

```bash
yarn run build
```

Locally preview production build:

```bash
yarn run preview
```
## Firebase Setup
Refer to the README located in the src/Firebase folder

## Using Docker
Run

```
yarn dev:docker
```

Open another terminal and run 

```
docker exec -it wadl_firebase /bin/bash
```
to go into the container

Once inside the container, run (make sure you have an account with Firebase and is granted permission for the project before doing this) 

```
firebase login
```
and follow the link to authenticate your account

Finally, run 

```
firebase emulators:start --import=dummyData
```
inside the container

## More info
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
