# Troubleshooting Guide

This guide helps you resolve common issues with the Sicher Tech e-commerce platform.

## Error: "No products returned from API, using static data"

### Symptoms
- Warning message in console: `[getProducts] No products returned from API, using static data`
- Products display but may not reflect database changes
- Admin product management doesn't persist changes

### Root Causes

1. **Firestore database is empty**
2. **Firestore rules are blocking access**
3. **Firebase configuration is incorrect**
4. **Network/CORS issues on Vercel**

### Solutions

#### Solution 1: Seed the Database

The most common cause is an empty database. Populate it with products:

```bash
npm run seed:products
```

This will add 12 sample products to your Firestore database.

#### Solution 2: Verify Firestore Rules

Make sure your Firestore rules allow reading products:

```javascript
match /products/{productId} {
  allow read: if true;  // Public read access
  allow write: if isAdmin();
}
```

Deploy the rules:

```bash
firebase deploy --only firestore:rules
```

#### Solution 3: Check Firebase Configuration

Verify all environment variables are set correctly:

**Local Development** (`.env.local`):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Vercel Deployment**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all `NEXT_PUBLIC_FIREBASE_*` variables
3. Make sure they're enabled for all environments (Production, Preview, Development)
4. Redeploy after adding variables

#### Solution 4: Test Firebase Connection

Create a test file to verify Firebase connectivity:

```typescript
// test-firebase.ts
import { db } from './src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function testConnection() {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    console.log(`✅ Connected! Found ${snapshot.size} products`);
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();
```

Run with: `npx tsx test-firebase.ts`

#### Solution 5: Check Vercel Logs

If deployed on Vercel:

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check **Function Logs** for errors
4. Look for Firebase-related errors

Common errors:
- `Firebase: Error (auth/invalid-api-key)` → Check API key
- `Missing or insufficient permissions` → Check Firestore rules
- `Network request failed` → Check Firebase project settings

## Error: "Failed to fetch user role"

### Symptoms
- Cannot access admin dashboard
- Stuck on loading screen after login
- Console error about user role

### Solutions

#### Solution 1: Create User Document

When a user signs up, a document should be created in the `users` collection. If it's missing:

1. Go to Firebase Console → Firestore Database
2. Check if `users` collection exists
3. Check if your user document exists (by UID)
4. If missing, sign up again or manually create:

```javascript
{
  uid: "user_uid_here",
  email: "user@example.com",
  role: "customer",
  createdAt: Timestamp
}
```

#### Solution 2: Check Firestore Rules

Verify users can read their own data:

```javascript
match /users/{userId} {
  allow read: if request.auth.uid == userId || isAdmin();
}
```

#### Solution 3: Clear Cache and Re-login

1. Log out
2. Clear browser cache
3. Log in again

## Error: "Admin access denied"

### Symptoms
- Redirected away from `/admin` page
- "Access denied" message
- Role shows as "customer" instead of "admin"

### Solutions

#### Solution 1: Promote User to Admin

Use the promotion script:

```bash
npm run promote:admin your-email@example.com
```

Or manually in Firebase Console:
1. Go to Firestore Database → `users` collection
2. Find your user document
3. Edit `role` field to `admin` (lowercase)
4. Save

#### Solution 2: Log Out and Back In

After promotion:
1. Log out completely
2. Close all browser tabs
3. Log back in
4. Try accessing `/admin` again

#### Solution 3: Verify Role in Database

Check the actual value in Firestore:
1. Firebase Console → Firestore Database
2. Navigate to `users/{your-uid}`
3. Verify `role` field is exactly `admin` (not `Admin` or `ADMIN`)

## Error: "Firebase configuration is incomplete"

### Symptoms
- App crashes on load
- Error message about missing Firebase config
- Console error: "Firebase configuration is incomplete"

### Solutions

#### Solution 1: Check Environment Variables

Make sure ALL required variables are set:

```bash
# Check if variables are loaded
echo $NEXT_PUBLIC_FIREBASE_API_KEY
echo $NEXT_PUBLIC_FIREBASE_PROJECT_ID
```

If empty, they're not loaded. Check:
1. `.env.local` exists in project root
2. Variable names are correct (including `NEXT_PUBLIC_` prefix)
3. No extra spaces or quotes around values
4. File is not named `.env.local.txt` or similar

#### Solution 2: Restart Development Server

After adding/changing environment variables:

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

#### Solution 3: Verify Firebase Project

1. Go to Firebase Console
2. Check that the project exists
3. Verify the project ID matches your config
4. Make sure Firestore and Authentication are enabled

## Error: "experimentalForceLongPolling" warnings

### Symptoms
- Warning in console about long polling
- Slow database operations
- Intermittent connection issues

### Solutions

This is expected behavior on Vercel and some hosting platforms. The app is configured to handle this automatically.

If you want to disable the warning:

```typescript
// src/lib/firebase.ts
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  ignoreUndefinedProperties: true,
});
```

This is already implemented in the fixed version.

## Products Not Updating After Admin Changes

### Symptoms
- Admin adds/edits product
- Changes don't appear on frontend
- Old data still showing

### Solutions

#### Solution 1: Clear Browser Cache

```bash
# In browser DevTools
# Application → Clear Storage → Clear site data
```

#### Solution 2: Hard Refresh

- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

#### Solution 3: Check API Response

1. Open DevTools → Network tab
2. Filter by `products`
3. Check the API response
4. Verify new data is in the response

If data is in response but not displaying:
- Check React state updates
- Verify component re-renders
- Check for caching in `getProducts()` function

## Deployment Issues on Vercel

### Build Fails

**Check build logs:**
1. Vercel Dashboard → Deployments → Click deployment
2. View build logs
3. Look for TypeScript or dependency errors

**Common fixes:**
```bash
# Update dependencies
npm update

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

**Verify in Vercel:**
1. Settings → Environment Variables
2. Check all variables are present
3. Verify they're enabled for correct environment
4. Redeploy after changes

**Important:** Changes to environment variables require a redeploy!

### Functions Timing Out

If Vercel functions timeout:

1. Check function execution time in logs
2. Optimize database queries
3. Add caching where possible
4. Consider upgrading Vercel plan for longer timeouts

## Getting Help

If you're still experiencing issues:

1. **Check the logs:**
   - Browser console (F12)
   - Vercel function logs
   - Firebase Console logs

2. **Verify configuration:**
   - All environment variables set
   - Firestore rules deployed
   - Database seeded with products

3. **Test locally first:**
   - Run `npm run dev`
   - Test all features locally
   - Fix local issues before deploying

4. **Review documentation:**
   - [README.md](./README.md) - Setup guide
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
   - [SECURITY.md](./SECURITY.md) - Security information

5. **Common commands:**
   ```bash
   # Seed database
   npm run seed:products
   
   # Promote admin
   npm run promote:admin email@example.com
   
   # Deploy Firestore rules
   firebase deploy --only firestore:rules
   
   # Check for errors
   npm run typecheck
   npm run lint
   ```

---

**Last Updated:** February 2026
