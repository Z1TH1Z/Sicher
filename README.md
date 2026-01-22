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

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
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

## 🔒 Firebase Setup

### Firestore Rules
Create a `users` collection with the following structure:
```javascript
{
  uid: string,
  email: string,
  role: 'customer' | 'admin',
  createdAt: timestamp
}
```

### Creating an Admin User
1. Sign up through the app
2. In Firebase Console, go to Firestore
3. Find the user document and change `role` from `customer` to `admin`

## 🎨 Customization

### Adding Products
Edit `src/lib/products.ts` to add or modify products.

### Theming
The app uses CSS variables for theming. Modify `src/app/globals.css` to customize colors.

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
