# URL SHORTENING SERVICE (NodeJS & POSTGRESQL)

## Overview
- Implement a URL shortening service like TinyURL. a URL shortening service like TinyURL. This service will provide short aliases redirecting to long URLs

## API Documentation
- https://lilbiturl.herokuapp.com/api-docs

## Deployed App
- https://lilbiturl.herokuapp.com

## Database Model
- {
    id: uuid
    url: string,
    processedUrl: string,
    requestType: enum
}
## Setting up for Development
- RUN npm install
- Install postgres
- Create database
- RUN npm run dev

## Tests Image
![Image description](https://github.com/manuelbiolatiri/url-shortening-service/blob/master/src/tests/testSnapshot.jpeg)
