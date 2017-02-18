# Link Collection App (A practice in using GraphQL, Relay, React) 

This is a small spin on a To Do list app to show CRUD operations backed by Postgres using the RGR stack.

## Prerequisites
- Docker
- Node > 6.0

## Running the app

From the project directory, we first create a bootstrapped postgres instance with docker, we then build and run the app using npm
```
cd postgres
./build.sh
cd ..
docker-compose up -d
./bootstrap.sh (wait a few seconds before doing this to allow postgres to come up)
yarn
npm run build && npm run dev
```
