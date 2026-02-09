# Quick Start Guide

Get your Sicher Tech e-commerce platform up and running in minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Firebase account
- (Optional) Vercel account for deployment

## 5-Minute Local Setup

### 1. Clone and Install (1 min)

```bash
git clone https://github.com/Z1TH1Z/Sicher.git
cd Sicher
npm install
```

### 2. Firebase Setup (2 min)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Firestore Database** (Production mode)
4. Enable **Authentication** → Email/Password
5. Get your config from Project Settings → Your apps

### 3. Environment Variables (1 min)

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Deploy Rules & Seed Data (1 min)

```bash
# Deploy Firestore security rules
firebase deploy --only firestore:rules

# Seed database with sample products
npm run seed:products
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:9002](http://localhost:9002)

## Create Admin User

After signing up through the app:

```bash
npm run promote:admin your-email@example.com
```

Then log out and log back in to access `/admin`

## Deploy to Vercel (5 min)

### Quick Deploy

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Deploy!

### Detailed Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## Troubleshooting

### No products showing?

```bash
npm run seed:products
```

### Can't access admin?

```bash
npm run promote:admin your-email@example.com
```

### Firebase errors?

Check that all environment variables are set correctly in `.env.local`

### More help?

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
- [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Complete checklist
- [README.md](./README.md) - Full documentation

## What's Next?

- [ ] Customize products in `src/lib/products.ts`
- [ ] Customize theme in `src/app/globals.css`
- [ ] Set up Google AI for recommendations (optional)
- [ ] Deploy to production
- [ ] Set up monitoring

## Key Features

✅ Product catalog with categories
✅ Shopping cart with persistence
✅ User authentication
✅ Admin dashboard
✅ Order management
✅ AI-powered recommendations (with Google AI key)
✅ Responsive design
✅ Secure by default

## Project Structure

```
src/
├── app/              # Next.js pages
│   ├── admin/       # Admin dashboard
│   ├── products/    # Product pages
│   ├── cart/        # Shopping cart
│   └── checkout/    # Checkout flow
├── components/       # React components
├── lib/             # Utilities & data
│   ├── firebase.ts  # Firebase config
│   ├── auth.ts      # Authentication
│   └── products.ts  # Product data
└── contexts/        # React contexts
```

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run seed:products    # Seed database
npm run promote:admin    # Promote user to admin
npm run typecheck    # Check TypeScript
npm run lint         # Run ESLint
```

## Security Notes

- ✅ No hardcoded credentials
- ✅ Secure Firestore rules
- ✅ Role-based access control
- ✅ Environment variables for secrets
- ✅ Input validation

See [SECURITY.md](./SECURITY.md) for details.

## Support

Need help? Check these resources:

1. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Fix common issues
2. [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production
3. [SECURITY.md](./SECURITY.md) - Security best practices
4. [README.md](./README.md) - Complete documentation

---

**Ready to build?** Start with `npm run dev` and visit http://localhost:9002

**Ready to deploy?** Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
