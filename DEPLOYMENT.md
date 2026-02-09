# Deployment Guide for Vercel

This guide will help you deploy the Sicher Tech e-commerce platform to Vercel with proper Firebase configuration.

## Prerequisites

1. A Vercel account (https://vercel.com)
2. A Firebase project with Firestore and Authentication enabled
3. Your Firebase configuration values
4. (Optional) Google AI API key for AI features

## Step 1: Prepare Your Firebase Project

### 1.1 Enable Firestore Database

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project
3. Navigate to **Firestore Database**
4. Click **Create Database**
5. Choose **Production mode** (we'll deploy custom rules)
6. Select a location close to your users

### 1.2 Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method

### 1.3 Deploy Firestore Rules

Deploy the security rules to protect your database:

```bash
firebase deploy --only firestore:rules
```

Or manually copy the rules from `firestore.rules` to Firebase Console.

### 1.4 Seed Products (Optional)

If you want to populate your database with sample products:

```bash
npm run seed:products
```

## Step 2: Configure Environment Variables

### 2.1 Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click on the web app or create one
4. Copy the configuration values

### 2.2 Set Up Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API Key | From Firebase config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Your Auth Domain | Usually `project-id.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Your Project ID | From Firebase config |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Your Storage Bucket | Usually `project-id.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your Sender ID | From Firebase config |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Your App ID | From Firebase config |
| `GOOGLE_API_KEY` | Your Google AI API Key | Optional, for AI features |

**Important:** Make sure to add these variables for all environments (Production, Preview, Development).

## Step 3: Deploy to Vercel

### Option A: Deploy via Git (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Add environment variables (see Step 2.2)
5. Click **Deploy**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 4: Create Admin User

After deployment, you need to create an admin user:

### 4.1 Sign Up

1. Visit your deployed site
2. Click **Sign Up**
3. Create an account with your email

### 4.2 Promote to Admin

Run the promotion script locally (it will update the production database):

```bash
npm run promote:admin your-email@example.com
```

Or manually in Firebase Console:

1. Go to **Firestore Database**
2. Find the `users` collection
3. Locate your user document
4. Edit the `role` field from `customer` to `admin`

### 4.3 Verify Admin Access

1. Log out and log back in
2. Navigate to `/admin`
3. You should now have access to the admin dashboard

## Step 5: Verify Deployment

### 5.1 Test Core Features

- [ ] Homepage loads correctly
- [ ] Products are displayed
- [ ] User can sign up
- [ ] User can log in
- [ ] Shopping cart works
- [ ] Admin can access `/admin`
- [ ] Admin can add/edit/delete products

### 5.2 Check Logs

If something isn't working:

1. Go to Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Check **Function Logs** for errors
4. Check **Build Logs** for build issues

## Common Issues and Solutions

### Issue: "No products returned from API"

**Solution:** 
- Verify Firestore rules are deployed
- Check that products collection exists in Firestore
- Run `npm run seed:products` to populate database
- Check Vercel function logs for errors

### Issue: "Failed to fetch user role"

**Solution:**
- Verify all Firebase environment variables are set in Vercel
- Check that the user document exists in Firestore `users` collection
- Verify Firestore rules allow reading user documents

### Issue: "Admin access denied"

**Solution:**
- Make sure you've promoted the user to admin (see Step 4.2)
- Log out and log back in after promotion
- Check that the `role` field in Firestore is exactly `admin` (lowercase)

### Issue: "Firebase configuration is incomplete"

**Solution:**
- Double-check all environment variables in Vercel
- Make sure variable names match exactly (including `NEXT_PUBLIC_` prefix)
- Redeploy after adding/updating environment variables

### Issue: "experimentalForceLongPolling" errors

**Solution:**
- This is normal for Vercel deployments
- The app will fall back to static data if Firestore is unreachable
- Check that your Firebase project allows requests from your Vercel domain

## Security Checklist

- [ ] Firestore rules are deployed and tested
- [ ] Environment variables are set in Vercel (not in code)
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] Admin role cannot be self-assigned (enforced by Firestore rules)
- [ ] CORS is properly configured in Firebase
- [ ] Authentication is required for sensitive operations

## Performance Optimization

### Enable Caching

Add these headers in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/api/products',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=60, stale-while-revalidate=120',
        },
      ],
    },
  ];
}
```

### Use ISR for Product Pages

In `src/app/products/[id]/page.tsx`, add:

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

## Monitoring

### Set Up Vercel Analytics

1. Go to Vercel Dashboard → Your Project → **Analytics**
2. Enable **Web Analytics**
3. Deploy to activate

### Set Up Firebase Monitoring

1. In Firebase Console, go to **Performance**
2. Follow setup instructions
3. Monitor database performance and errors

## Support

If you encounter issues:

1. Check Vercel function logs
2. Check Firebase Console logs
3. Review this deployment guide
4. Check the main README.md for project documentation

---

**Last Updated:** February 2026
