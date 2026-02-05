# Google OAuth Setup Guide for Kanban Server

## Overview

This guide explains how to set up Google OAuth authentication for your Kanban backend.

---

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project

1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Click the project dropdown at the top
3. Click **NEW PROJECT**
4. Name: `kanban-kisra`
5. Click **CREATE**

### 1.2 Enable Required APIs

1. Go to **APIs & Services** → **Library**
2. Search for **Google+ API**
3. Click it and press **ENABLE**

### 1.3 Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**

#### If you see "Configure OAuth consent screen":

1. Choose **External** as User Type
2. Fill in:
   - App name: `Kanban Kisra`
   - User support email: your email
   - Developer contact: your email
3. Click **SAVE AND CONTINUE**
4. Add Scopes: Search and select:
   - `email`
   - `profile`
5. Click **SAVE AND CONTINUE**
6. Skip Test Users, click **SAVE AND CONTINUE**

#### Back to Creating Credentials:

1. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Application type: **Web application**
3. Name: `Kanban Kisra Web Client`
4. Click **ADD URI** under **Authorized JavaScript origins**:
   ```
   http://localhost:8080
   http://localhost:3000
   http://127.0.0.1:8080
   http://127.0.0.1:3000
   ```
5. Click **ADD URI** under **Authorized redirect URIs**:
   ```
   http://localhost:3000
   http://localhost:8080
   http://127.0.0.1:3000
   http://127.0.0.1:8080
   ```
6. Click **CREATE**

### 1.4 Get Your Credentials

1. You'll see a popup with:
   - **Client ID**
   - **Client Secret**
2. **COPY both values** - you'll need them in the next step

---

## Step 2: Configure Your Backend

### 2.1 Create `.env` File

```bash
cd /Users/kisrakap/Downloads/Kanban/kanban-kisra-server
```

Create a `.env` file with:

```env
GOOGLE_CLIENT_ID=your_client_id_from_step_1_4
GOOGLE_CLIENT_SECRET=your_client_secret_from_step_1_4
JWT_SECRET=rahasia
NODE_ENV=development
PORT=3000
```

**Replace:**

- `your_client_id_from_step_1_4` with your actual Client ID
- `your_client_secret_from_step_1_4` with your actual Client Secret

### 2.2 Make Sure Dependencies Are Installed

```bash
npm install
```

The required package `google-auth-library` is already in your `package.json`.

---

## Step 3: Update Frontend Configuration

In your `kanban-kisra-client/src/views/Login.vue`, update the Client ID:

```javascript
data() {
    return {
        clientId: 'YOUR_CLIENT_ID_FROM_GOOGLE_CONSOLE'
    }
}
```

---

## Step 4: Start Your Servers

### Terminal 1 - Backend:

```bash
cd /Users/kisrakap/Downloads/Kanban/kanban-kisra-server
npm run dev
```

Expected output:

```
Server running on port 3000
```

### Terminal 2 - Frontend:

```bash
cd /Users/kisrakap/Downloads/Kanban/kanban-kisra-client
npm run serve
```

Expected output:

```
App running at:
  - Local:   http://localhost:8080/
```

---

## Step 5: Test Google Login

1. Open your browser to `http://localhost:8080`
2. Click **"Continue with Google"** button
3. Sign in with your Google account
4. You should be redirected to the homepage
5. Check browser console for any errors

---

## How It Works

### Frontend Flow:

1. User clicks "Continue with Google"
2. Browser opens Google sign-in popup
3. User authenticates with Google
4. Google returns an `id_token` to frontend
5. Frontend sends `id_token` to backend `/googlelogin` endpoint

### Backend Flow:

1. Backend receives `id_token` from frontend
2. Backend verifies the token with Google's OAuth2Client
3. Backend checks if user exists in database
4. If user doesn't exist, backend creates new user
5. Backend generates JWT token
6. Backend sends JWT token back to frontend
7. Frontend stores JWT and logs user in

---

## Troubleshooting

### Error: "redirect_uri_mismatch"

- Check that your localhost URLs are registered in Google Console
- Make sure http (not https) for localhost
- Restart both frontend and backend

### Error: "Invalid Client ID"

- Check that Client ID in Frontend matches .env GOOGLE_CLIENT_ID
- Verify Client ID is correct in Google Console

### Error: "Token not verified"

- Make sure Client Secret is correct in `.env`
- Verify token is being sent correctly from frontend

### Error: "User.username cannot be null"

- Ensure Google account has a name set
- Check backend logs for full error

---

## Backend Endpoint Reference

### POST /googlelogin

**Request:**

```json
{
  "id_token": "google_id_token_from_frontend"
}
```

**Success Response (200):**

```json
{
  "id": 1,
  "username": "John Doe",
  "email": "john@example.com",
  "access_token": "jwt_token_here"
}
```

**Error Response (400):**

```json
{
  "errors": ["ID token is required"]
}
```

---

## Environment Variables

| Variable             | Value                         | Example                                                                    |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| GOOGLE_CLIENT_ID     | From Google Console           | `245291727558-vofc4itller4qprc8d0rtsmgpc4d6vhj.apps.googleusercontent.com` |
| GOOGLE_CLIENT_SECRET | From Google Console           | `GOCSPX-xxxxxxxxxxxxxx`                                                    |
| JWT_SECRET           | Any secret string             | `rahasia`                                                                  |
| NODE_ENV             | `development` or `production` | `development`                                                              |
| PORT                 | Server port                   | `3000`                                                                     |

---

## Security Notes

⚠️ **Important:**

- Never commit `.env` file to git
- `.env` is in `.gitignore` (don't add it)
- Client Secret should only be in backend `.env`
- Never expose Client Secret in frontend code

---

## Next Steps

✅ Backend is configured and running
✅ Frontend has Google button and proper callback
✅ Users can now login with Google!

For production deployment:

1. Update GOOGLE_CLIENT_ID in frontend for production URL
2. Add production URLs to Google Cloud Console
3. Use environment-based configuration
4. Enable HTTPS (required for production)

---

Need help? Check the backend logs with: `npm run dev`
