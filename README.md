## The Deployed Application

The deployed application can be found at [https://step-guard-playground.vercel.app/](https://step-guard-playground.vercel.app/)

## Project Overview

### Journey Guard Protection

This is a proof of concept repo that outlines a technical solution for preventing users from skipping steps on their customer journey.

## Technical Overview

### Journey Guard Protection

To ensure users complete their customer journey steps in order and don't skip any, a journey guard protection mechanism has been implemented. This is achieved through middleware that checks the user's progress and redirects them if they attempt to access a step they haven't reached yet.

The middleware is defined in [`src/middleware.ts`](src/middleware.ts) and uses cookies to track the user's progress. As they submit each step we update the cookie to allow them to access the next step.

The progress is encoded and decoded using functions in [`src/lib/token-encode-decode.ts`](src/lib/token-encode-decode.ts). And is hashed using a secret on the backend to prevent tampering.

## Getting Started

These instructions will guide you on setting up this repo on your local machine.

### Prerequisites

- Node.js
- npm
- Docker (if you want to run the OpenTelemetry Collector)

## Setting Up The Project

1. Navigate to the project directory:

```bash
cd ...
```

2. Install Dependencies:

```bash
npm install
```

4. Setup environment variables:

**copy the `.env.example` file to a new file called `.env.local`.**

```bash
copy .env.example .env.local
```

Replace the **`PROGRESS_TOKEN_SECRET`** variable with your own secret.

## Run Development Server

Finally, run the development server:

```bash
npm run dev
```

Now you can open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
