# CodeSupport Website Frontend

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c60ad30ea5664c70a5b10c3525ed4f4f)](https://app.codacy.com/gh/codesupport/website-frontend?utm_source=github.com&utm_medium=referral&utm_content=codesupport/website-frontend&utm_campaign=Badge_Grade_Dashboard)

## About
This repository contains the frontend for the CodeSupport Website. The project is written in JavaScript using the React user interface library on top of Next.js.

## Setup
1. Navigate into the repository on your computer and run `npm i`
2. Start the React app with `npm run dev`
3. Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Auth0
This project uses [Auth0](https://auth0.com) for authentication. You will need to create a development project and register a SPA against it for free on their website and provide the following environment variables up and running:
- `NEXT_PUBLIC_AUTH_DOMAIN` - your Auth0 application's auth domain
- `NEXT_PUBLIC_AUTH_CLIENT_ID` - your Auth0 application's client ID
- `NEXT_PUBLIC_BASE_URL` - the base URL to your Next.js project (likely `http://localhost:3000`)
- `NEXT_PUBLIC_AUTH_AUDIENCE_URL` - the base URL to the API (likely `http://localhost:8080`)

## Structure
- All pages live inside `pages/`
- All other components live inside `components/`
  - We're using [Atomic Design](http://atomicdesign.bradfrost.com) to keep our components organised

## Commands
- To start the React app use `npm start`
- To run the development server use `npm run dev`

**Any Questions?** Feel free to mention @LamboCreeper#6510 in the [CodeSupport Discord](https://discord.gg/Hn9SETt).
