# Nuxt Minimal Starter

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

# install packages
npm install jose

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

# What it does

# The Login Endpoint (POST /api/auth/login):
User sends { email: "me@example.com" }.

Create a JWT containing that email and an expiration (e.g., 10 minutes).

The idea is to send an email with a link: https://myapp.com/api/auth/verify?token=JWT_STRING

but I've just logged the url in the console where you can Ctrl + Click it.

# The Verification Endpoint (GET /api/auth/verify):
This route receives the token from the URL query.

It verifies the signature.

It sets a Session Cookie (auth_token) using setCookie.

It redirects the user to /dashboard.

# The Middleware (middleware/auth.ts):
Runs on every page navigation.

Checks if the auth_token cookie exists.

If not, redirects to /login.
