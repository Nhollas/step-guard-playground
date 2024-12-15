## The Deployed Application

The deployed application can be found at [https://step-guard-playground.vercel.app/](https://step-guard-playground.vercel.app/)

## Project Overview

### Journey Guard Protection

This is a proof of concept repo that outlines a technical solution for preventing users from skipping steps on their customer journey.

### Live Sync Global Store With Form

I've also looked at a slightly different approach to the [Wizard Form Funnel Pattern](https://www.react-hook-form.com/advanced-usage/#WizardFormFunnel). The state still goes to the store but instead of pushing up the data ONLY on the submission of each step, we continuously persist the data to the store as the users makes changes.

The main reason I think this is beneficial is we may end up having steps with a large amount of inputs and the user might accidently refresh or loose their state right before the end causing them to loose a lot of time and have to re-enter all the info they gave us.

## Technical Details

### Journey Guard Protection

To ensure users complete their customer journey steps in order and don't skip any, a journey guard protection mechanism has been implemented. This is achieved through middleware that checks the user's progress and redirects them if they attempt to access a step they haven't reached yet.

The middleware is defined in [`src/middleware.ts`](src/middleware.ts) and uses cookies to track the user's progress. As they submit each step we update the cookie to allow them to access the next step.

The progress is encoded and decoded using functions in [`src/lib/token-encode-decode.ts`](src/lib/token-encode-decode.ts). And is hashed using a secret on the backend to prevent tampering.

### Live Sync Global Store With Form

To prevent users from losing their data if they accidentally refresh the page, a mechanism to continuously sync the form data with a global store is implemented.

This is done using the [`useSyncFormWithStore`](src/hooks/use-sync-form-with-store.ts) hook defined in [`src/hooks/use-sync-form-with-store.ts`](src/hooks/use-sync-form-with-store.ts).

This hook subscribes to the form values and updates the store as changes occur. The store is created using Zustand and is defined in [`src/stores/journey-store.ts`](src/stores/journey-store.ts). The values that persist to the store then act as pre-fill data if the user accidently refreshes their page.

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
