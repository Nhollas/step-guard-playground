## The Deployed Application

The deployed application can be found at [https://step-guard-playground.vercel.app/](https://step-guard-playground.vercel.app/)

## Project Overview

This is a proof of concept repo that outlines a technical solution for preventing users from skipping steps on their customer journey.

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
