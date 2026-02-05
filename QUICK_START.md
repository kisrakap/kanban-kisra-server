# Google OAuth Quick Start

## 5 Minute Setup

### 1️⃣ Get Credentials from Google Console

- Go to: https://console.cloud.google.com
- Create OAuth 2.0 Web Client
- Copy Client ID and Secret

### 2️⃣ Update Backend `.env`

```bash
cd kanban-kisra-server
echo "GOOGLE_CLIENT_ID=YOUR_ID_HERE" > .env
echo "GOOGLE_CLIENT_SECRET=YOUR_SECRET_HERE" >> .env
echo "JWT_SECRET=rahasia" >> .env
echo "PORT=3000" >> .env
```

### 3️⃣ Update Frontend Client ID

Edit: `kanban-kisra-client/src/views/Login.vue`

```javascript
clientId: "YOUR_CLIENT_ID_HERE";
```

### 4️⃣ Start Servers

```bash
# Terminal 1
cd kanban-kisra-server && npm run dev

# Terminal 2
cd kanban-kisra-client && npm run serve
```

### 5️⃣ Test

- Go to http://localhost:8080
- Click "Continue with Google"
- Sign in with Google account

## Important URLs in Google Console

**Authorized JavaScript Origins:**

```
http://localhost:8080
http://localhost:3000
```

**Authorized Redirect URIs:**

```
http://localhost:3000
http://localhost:8080
```

## File Checklist

✅ `kanban-kisra-server/.env` - Created with credentials
✅ `kanban-kisra-server/app.js` - Updated with dotenv
✅ `kanban-kisra-server/helpers/jwt.js` - Updated with env variable
✅ `kanban-kisra-client/src/views/Login.vue` - Has correct Client ID
✅ `kanban-kisra-client/src/main.js` - Has Google plugin

## API Endpoint

**POST** `http://localhost:3000/googlelogin`

```json
{
  "id_token": "token_from_google"
}
```

Returns:

```json
{
  "id": 1,
  "username": "John Doe",
  "email": "john@example.com",
  "access_token": "jwt_token"
}
```

## Debugging

Check backend logs:

```bash
npm run dev
```

Check frontend console:

- Open DevTools (F12)
- Look for Google sign-in errors
