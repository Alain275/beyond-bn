# Beyond Backend

Express backend for the Beyond the Horizon platform.

## Features

- `POST /api/auth/register` for `user` and `admin` registration
- `POST /api/auth/login` using email or generated student ID
- Swagger UI documentation at `/api-docs`
- In-memory seeded accounts for quick testing

## Quick start

```bash
npm install
npm run dev
```

The server runs on `https://beyond-bn.onrender.com` by default.

## Seeded accounts

- Admin: `admin@beyond.com` / `Admin@123`
- User: `user@beyond.com` / `User@123`

## Swagger

Open `https://beyond-bn.onrender.com/api-docs` after starting the server.