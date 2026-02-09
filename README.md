# 🔐 Sicher Tech

A modern e-commerce platform for premium security products, built with Next.js 15, Firebase, and AI-powered recommendations.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-11.9-orange?logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## ✨ Features

### 🛒 E-commerce
- **Product Catalog** - Browse security cameras, smart locks, sensors, and more
- **Shopping Cart** - Add/remove items with persistent state
- **Secure Checkout** - Complete purchase flow
- **Order Tracking** - Track order status and delivery

### 🔑 Authentication
- **Customer Accounts** - Sign up, login, view order history
- **Admin Dashboard** - Manage products and orders
- **Role-based Access** - Separate customer and admin experiences
- **Firebase Auth** - Secure authentication with email/password

### 🤖 AI-Powered Features
- **Product Recommendations** - AI suggests relevant products based on preferences
- **Product Explanations** - AI explains product features in simple terms
- **Powered by Google Genkit** - Enterprise-grade AI integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Z1TH1Z/Sicher.git
   cd Sicher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google AI (for Genkit)
   GOOGLE_API_KEY=your_google_ai_api_key
   ```

4. **Deploy Firestore security rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed:products
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:9002](http://localhost:9002)

## 📁 Project Structure

```
src/
├── ai/                     # AI flows (Genkit)
│   └── flows/
│       ├── explain-product.ts
│       └── product-recommendations.ts
├── app/                    # Next.js App Router
│   ├── account/           # Customer account page
│   ├── admin/             # Admin dashboard
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── login/             # Login page
│   ├── signup/            # Registration page
│   ├── products/          # Product listings
│   └── track-order/       # Order tracking
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   └── admin/            # Admin-specific components
├── contexts/             # React Context providers
│   └── auth-context.tsx  # Authentication state
├── hooks/                # Custom React hooks
└── lib/                  # Utilities and data
    ├── auth.ts          # Authentication functions
    ├── firebase.ts      # Firebase configuration
    └── products.ts      # Product data
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | Radix UI + shadcn/ui |
| **Authentication** | Firebase Auth |
| **Database** | Firebase Firestore |
| **AI** | Google Genkit |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 9002 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start Genkit AI development server |
| `npm run seed:products` | Seed database with sample products |
| `npm run promote:admin` | Promote a user to admin role |

## 🔒 Firebase Setup

### Firestore Rules
The app uses secure Firestore rules that:
- Allow public read access to products
- Restrict product modifications to admins only
- Prevent users from changing their own role
- Ensure users can only access their own data

Deploy rules with:
```bash
firebase deploy --only firestore:rules
```

### Database Structure

**users collection:**
```javascript
{
  uid: string,
  email: string,
  role: 'customer' | 'admin',
  createdAt: timestamp
}
```

**products collection:**
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  image: string,
  category: string,
  specs: Record<string, string>
}
```

### Creating an Admin User

**Important:** For security reasons, admin access cannot be self-assigned. Follow these steps:

#### Method 1: Using the Promotion Script (Recommended)

1. First, sign up through the app with your email
2. Run the promotion script:
   ```bash
   npm run promote:admin your-email@example.com
   ```
3. Log out and log back in to see admin features

#### Method 2: Manual Promotion via Firebase Console

1. Sign up through the app
2. In Firebase Console, go to Firestore Database
3. Navigate to the `users` collection
4. Find your user document (by email)
5. Edit the document and change `role` from `customer` to `admin`
6. Log out and log back in

**Security Note:** The hardcoded admin bypass has been removed. All admin access is now properly managed through Firestore.

## 🎨 Customization

### Adding Products
Edit `src/lib/products.ts` to add or modify products.

### Theming
The app uses CSS variables for theming. Modify `src/app/globals.css` to customize colors.

## 🚀 Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Environment Variables for Production

Make sure to set all environment variables in your Vercel project settings:
- All `NEXT_PUBLIC_FIREBASE_*` variables
- `GOOGLE_API_KEY` for AI features

## 🔐 Security

This project implements several security measures:
- Role-based access control (RBAC)
- Firestore security rules
- Secure authentication flow
- Input validation
- No hardcoded credentials

For detailed security information, see [SECURITY.md](./SECURITY.md)

## 🐛 Troubleshooting

### "No products returned from API"
- Run `npm run seed:products` to populate the database
- Check Firestore rules are deployed
- Verify environment variables are set

### "Failed to fetch user role"
- Ensure user document exists in Firestore
- Check Firestore rules allow reading user documents
- Verify Firebase configuration

### Admin access issues
- Use `npm run promote:admin your-email@example.com`
- Log out and log back in after promotion
- Check that role is exactly `admin` in Firestore

## 📄 License

This project is private and proprietary.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Built with ❤️ by Z1TH1Z
