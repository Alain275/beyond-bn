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

## Cloudinary image uploads

The `POST /api/articles/upload-image` endpoint now uploads directly to Cloudinary.

Required environment variables:

- Option 1: `CLOUDINARY_URL`
- Option 2: set all three below
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Request details:

- Content type: `multipart/form-data`
- Field name: `image`
- Allowed types: `jpeg`, `jpg`, `png`, `gif`, `webp`
- Max file size: `5MB`

Response example:

```json
{
	"imageUrl": "https://res.cloudinary.com/<cloud-name>/image/upload/v1710000000/beyond/articles/article-1710000000000-123456789.jpg"
}
```

Check Cloudinary readiness (without exposing secrets):

- `GET /health/config`