# Setup Checklist

Use this checklist to ensure your Sicher Tech e-commerce platform is properly configured.

## Initial Setup

### 1. Firebase Project Setup

- [ ] Create Firebase project at https://console.firebase.google.com/
- [ ] Enable Firestore Database
  - [ ] Choose production mode
  - [ ] Select appropriate region
- [ ] Enable Authentication
  - [ ] Enable Email/Password sign-in method
- [ ] Get Firebase configuration values
  - [ ] Copy API Key
  - [ ] Copy Auth Domain
  - [ ] Copy Project ID
  - [ ] Copy Storage Bucket
  - [ ] Copy Messaging Sender ID
  - [ ] Copy App ID

### 2. Local Environment Setup

- [ ] Clone repository
- [ ] Install dependencies: `npm install`
- [ ] Create `.env.local` file
- [ ] Add all Firebase configuration variables
- [ ] Add Google AI API key (optional, for AI features)
- [ ] Verify `.env.local` is in `.gitignore`

### 3. Firebase Configuration

- [ ] Deploy Firestore security rules: `firebase deploy --only firestore:rules`
- [ ] Verify rules in Firebase Console
- [ ] Seed database with products: `npm run seed:products`
- [ ] Verify products appear in Firestore

### 4. Local Testing

- [ ] Start development server: `npm run dev`
- [ ] Open http://localhost:9002
- [ ] Verify homepage loads
- [ ] Verify products display
- [ ] Test user signup
- [ ] Test user login
- [ ] Test shopping cart
- [ ] Test product search/filtering

### 5. Admin Setup

- [ ] Sign up with your admin email
- [ ] Promote user to admin: `npm run promote:admin your-email@example.com`
- [ ] Log out and log back in
- [ ] Access `/admin` page
- [ ] Test adding a product
- [ ] Test editing a product
- [ ] Test deleting a product

## Deployment Setup (Vercel)

### 1. Vercel Project Setup

- [ ] Create Vercel account
- [ ] Import repository from GitHub
- [ ] Configure project settings
- [ ] Set Node.js version (18+)

### 2. Environment Variables

Add all variables in Vercel Dashboard → Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `GOOGLE_API_KEY` (optional)

**Important:** Enable for all environments (Production, Preview, Development)

### 3. Deploy

- [ ] Trigger deployment
- [ ] Wait for build to complete
- [ ] Check build logs for errors
- [ ] Visit deployed URL

### 4. Post-Deployment Testing

- [ ] Homepage loads correctly
- [ ] Products display from database
- [ ] User signup works
- [ ] User login works
- [ ] Shopping cart persists
- [ ] Admin can access `/admin`
- [ ] Admin can manage products
- [ ] Check Vercel function logs for errors

### 5. Production Admin Setup

If you need to create admin on production:

- [ ] Sign up on production site
- [ ] Run promotion script (connects to production DB): `npm run promote:admin your-email@example.com`
- [ ] Or manually update in Firebase Console
- [ ] Log out and log back in
- [ ] Verify admin access

## Security Checklist

### Code Security

- [ ] No hardcoded credentials in code
- [ ] No API keys committed to git
- [ ] `.env.local` is in `.gitignore`
- [ ] All sensitive data uses environment variables

### Firebase Security

- [ ] Firestore rules are deployed
- [ ] Rules prevent users from changing their own role
- [ ] Rules restrict product modifications to admins
- [ ] Rules allow users to only access their own data
- [ ] Authentication is required for sensitive operations

### Vercel Security

- [ ] Environment variables are set in dashboard (not in code)
- [ ] Production and preview environments use different Firebase projects (recommended)
- [ ] HTTPS is enabled (automatic with Vercel)

## Maintenance Checklist

### Weekly

- [ ] Check Vercel function logs for errors
- [ ] Monitor Firebase usage
- [ ] Review authentication logs

### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Check for security vulnerabilities: `npm audit`
- [ ] Review and update Firestore rules if needed
- [ ] Audit admin users

### Quarterly

- [ ] Review and update security documentation
- [ ] Test disaster recovery procedures
- [ ] Review and optimize database queries
- [ ] Update Firebase SDK to latest version

## Troubleshooting

If something isn't working, check:

1. **Environment Variables**
   - [ ] All variables are set
   - [ ] No typos in variable names
   - [ ] Values are correct
   - [ ] Redeployed after changes (Vercel)

2. **Firebase Configuration**
   - [ ] Firestore rules are deployed
   - [ ] Database is seeded with products
   - [ ] Authentication is enabled
   - [ ] Project ID matches configuration

3. **Logs**
   - [ ] Check browser console for errors
   - [ ] Check Vercel function logs
   - [ ] Check Firebase Console logs

4. **Common Issues**
   - [ ] "No products" → Run `npm run seed:products`
   - [ ] "Admin access denied" → Run `npm run promote:admin`
   - [ ] "Firebase config incomplete" → Check environment variables
   - [ ] "Failed to fetch role" → Check Firestore rules

## Resources

- [README.md](./README.md) - Project overview and setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [SECURITY.md](./SECURITY.md) - Security best practices
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions

## Support

If you need help:

1. Check the troubleshooting guide
2. Review Firebase Console logs
3. Review Vercel function logs
4. Check that all checklist items are completed

---

**Last Updated:** February 2026
