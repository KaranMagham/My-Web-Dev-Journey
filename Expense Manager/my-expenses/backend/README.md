# Expenses Backend (Contact API)

This small Express server exposes `POST /api/contact` and sends emails using Nodemailer.

Setup

1. Copy `.env.example` to `.env` and fill SMTP credentials.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Run:

```bash
npm run dev
# or
npm start
```

The server listens on `http://localhost:4000` by default. The contact endpoint is:

`POST http://localhost:4000/api/contact`

Request JSON body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Hello",
  "message": "Message body"
}
```
