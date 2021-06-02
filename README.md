# swot-web-app

[![Build Status](https://dev.azure.com/safeh2o/SWOT/_apis/build/status/safeh2o.swot-web-app?branchName=master)](https://dev.azure.com/safeh2o/SWOT/_build/latest?definitionId=1&branchName=master)

Safe Water Optimization Tool Web Application

## Run Development Server

-   Install server dependencies with `npm ci`
-   Install frontend dependencies with `cd client` then `npm ci`
-   Run the application with `npm run dev` from the base directory or if you're using VS Code, simply press F5 to also attach a debugger
-   Go to `http://localhost:8080`

## Run on Production

-   Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
-   Run the server with `docker-compose up` or `docker-compose up -d`