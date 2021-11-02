# CodeSupport Website Frontend

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c60ad30ea5664c70a5b10c3525ed4f4f)](https://app.codacy.com/gh/codesupport/website-frontend?utm_source=github.com&utm_medium=referral&utm_content=codesupport/website-frontend&utm_campaign=Badge_Grade_Dashboard)

## About
This repository contains the frontend for the CodeSupport Website. The project is written in JavaScript using the React user interface library on top of Next.js.

## Dependencies

### Production
- [React](https://www.npmjs.com/package/react)
- [React DOM](https://www.npmjs.com/package/react-dom)
- [Next](http://npmjs.com/package/next)
- [UI Kit](http://npmjs.com/package/uikit)
- [Styled Components](http://npmjs.com/package/styled-components)
- [Axios](https://www.npmjs.com/package/axios)
- [Firebase](https://www.npmjs.com/package/firebase)
- [React Markdown](https://www.npmjs.com/package/react-markdown)
- [React Syntax Highlighter](https://www.npmjs.com/package/react-syntax-highlighter)

## Setup
1. Navigate into the repository on your computer and run `npm i`
2. Start the React app with `npm run dev`
3. Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Backend API
For developing parts of the website which rely on the CodeSupport API you will need to setup and run a local install of the [API](https://github.com/codesupport/website-backend).

**Want an easier setup?** Pull down our [website development environment](https://github.com/codesupport/website-dev-env) and quickly start working.

## Structure
- All pages live inside `pages/`
- All other components live inside `components/`
  - We're using [Atomic Design](http://atomicdesign.bradfrost.com) to keep our components organised

## Commands
- To start the React app use `npm start`
- To run the development server use `npm run dev`

**Any Questions?** Feel free to mention @LamboCreeper#6510 in the [CodeSupport Discord](https://discord.gg/Hn9SETt).
