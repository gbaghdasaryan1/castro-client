# Google Authentication Setup Guide

This document outlines the complete setup required for Google OAuth integration in your Next.js frontend and NestJS backend.

## Frontend Setup (Already Installed)

### 1. Environment Configuration

Add your Google Client ID to `.env`:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Get your Google Client ID from [Google Cloud Console](https://console.cloud.google.com/):

1. Create a new project or select an existing one
2. Go to **APIs & Services** > **Credentials**
3. Create an **OAuth 2.0 Client ID** (Web Application)
4. Add authorized redirect URIs:
   - Local: `http://localhost:3000`
   - Production: `https://yourdomain.com`
5. Copy the **Client ID**

### 2. Frontend Components

The following files have been created/modified:

#### Modified Files:
- [src/pages/_app.tsx](src/pages/_app.tsx) — Wrapped with `GoogleOAuthProvider`
- [src/features/auth/pages/login/index.tsx](src/features/auth/pages/login/index.tsx) — Added Google Login button
- [src/features/auth/auth-api.ts](src/features/auth/auth-api.ts) — Added `googleLoginRequest` function
- [src/features/auth/pages/login/login.module.scss](src/features/auth/pages/login/login.module.scss) — Added Google button styles

#### New Files:
- [src/pages/api/auth/google-callback.ts](src/pages/api/auth/google-callback.ts) — API handler for Google token exchange

### 3. How It Works

**Frontend Flow:**
1. User clicks "Sign in with Google"
2. Google OAuth popup opens
3. User authenticates and authorizes
4. Google returns an ID token (credential)
5. Frontend calls `/api/auth/google-callback` with the credential
6. Backend exchanges the credential for a JWT token
7. JWT token is stored in localStorage
8. User is redirected to home page

**API Flow:**
```
Google OAuth → GoogleLogin Component → /api/auth/google-callback → Backend /auth/google/callback → JWT Token
```

## Backend Setup

Your backend already has Google OAuth endpoints. Verify these are configured:

### 1. Backend Environment Variables

Ensure your backend `.env` has:

```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback  # or your frontend URL for production
```

### 2. Backend Implementation

Your backend controller already has:
- `GET /auth/google` — Redirects to Google consent screen (via GoogleAuthGuard)
- `GET /auth/google/callback` — Handles Google callback and returns JWT

The backend service should handle:
```typescript
async googleLogin(googleUser: {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
}) {
  const user = await this.usersService.findOrCreateByGoogle(googleUser);
  return { accessToken: this.issueToken(user.id, user.email) };
}
```

### 3. Verify Backend Response

The backend's `/auth/google/callback` should return:
```json
{
  "accessToken": "jwt_token_here"
}
```

## Testing

### Local Testing:

1. Start your backend:
   ```bash
   npm run start
   ```

2. Start your frontend:
   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:3000/login`

4. Click "Sign in with Google"

5. Verify in browser console:
   - Check Network tab → `/api/auth/google-callback` request should return `{ accessToken: "..." }`
   - Check Application tab → localStorage should contain `token` key

### Common Issues:

| Issue | Solution |
|-------|----------|
| Google popup doesn't appear | Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set and correct |
| `Invalid credential` error | Check backend is accessible and Google Client ID matches |
| Token not stored | Check backend response includes `accessToken` field |
| Redirect loop | Ensure protected routes check for token in localStorage |

## Security Considerations

1. **Never commit `.env` files** with real credentials
2. **HTTPS in production** — Google OAuth requires it
3. **Validate tokens** — Backend should verify JWT on each request
4. **CORS configuration** — Ensure backend allows requests from your frontend domain
5. **Secure localStorage** — Consider using httpOnly cookies for production

## Troubleshooting

### Backend receives request but returns 500

Check backend logs for:
- Database connection errors
- Google credential validation failures
- User creation errors

### Frontend shows "Google login failed"

1. Check browser console for errors
2. Check backend logs
3. Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is valid
4. Ensure backend `/auth/google/callback` endpoint exists

### Token not being set in localStorage

Check that API response includes `accessToken`:
```bash
curl -X POST http://localhost:4000/api/auth/google/callback \
  -H "Content-Type: application/json" \
  -d '{"idToken": "your_token"}'
```

## Production Deployment

1. **Update Google OAuth redirect URIs** to include your production domain
2. **Set environment variables** on your deployment platform:
   - Vercel: Settings → Environment Variables
   - AWS/Heroku: Use platform-specific env configuration
3. **Verify API URL** — Update `NEXT_PUBLIC_API_URL` for production backend
4. **Enable HTTPS** — Required for OAuth
5. **Update backend callback URL** to match production domain

## Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [NestJS Passport Google Strategy](https://docs.nestjs.com/recipes/passport#google)
