# Security Guidelines

This document outlines the security measures implemented in the Sicher Tech e-commerce platform and best practices for maintaining security.

## Authentication & Authorization

### User Roles

The application implements role-based access control (RBAC) with two roles:

- **Customer**: Default role for all new users
- **Admin**: Elevated privileges for product and order management

### Role Assignment Security

1. **New users are always created as customers** - This is enforced in the `createUserProfile` function
2. **Users cannot self-promote to admin** - Firestore rules prevent users from changing their own role
3. **Admin promotion requires manual intervention** - Use the `promote:admin` script or Firebase Console

### Authentication Flow

```
1. User signs up → Account created with 'customer' role
2. User logs in → Role fetched from Firestore
3. Protected routes check role → Access granted/denied based on role
```

## Firestore Security Rules

### Current Rules

```javascript
// Users can only read their own data
match /users/{userId} {
  allow read: if isOwner(userId) || isAdmin();
  allow create: if isOwner(userId) && role == 'customer';
  allow update: if (isOwner(userId) && role unchanged) || isAdmin();
}

// Products are public read, admin write
match /products/{productId} {
  allow read: if true;
  allow create, update, delete: if isAdmin();
}

// Orders belong to users
match /orders/{orderId} {
  allow read: if isOwner(order.userId) || isAdmin();
  allow create: if isAuthenticated() && userId matches auth.uid;
  allow update, delete: if isAdmin();
}
```

### Key Security Features

1. **Role immutability for users** - Users cannot change their own role
2. **Admin verification** - All admin operations verify role from Firestore
3. **Owner-based access** - Users can only access their own data
4. **Public product catalog** - Products are readable by everyone (necessary for e-commerce)

## Environment Variables

### Public vs Private Variables

**Public Variables** (prefixed with `NEXT_PUBLIC_`):
- Firebase configuration (API key, project ID, etc.)
- These are safe to expose in client-side code
- Firebase security is enforced by Firestore rules, not by hiding config

**Private Variables** (no prefix):
- `GOOGLE_API_KEY` - Used only on server-side
- Never exposed to client

### Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use Vercel environment variables** - Set in dashboard, not in code
3. **Rotate keys regularly** - Especially if exposed
4. **Use different projects for dev/prod** - Separate Firebase projects

## API Security

### API Routes Protection

All mutation operations (POST, PUT, DELETE) should verify authentication:

```typescript
// Example: Check auth before allowing operation
import { auth } from '@/lib/firebase';

export async function POST(request: Request) {
  const user = auth.currentUser;
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... proceed with operation
}
```

### Rate Limiting

Consider implementing rate limiting for API routes:

```typescript
// Example using Vercel Edge Config
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const { success } = await rateLimit(request);
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  // ... proceed
}
```

## Data Validation

### Input Validation

Always validate user input:

```typescript
import { z } from 'zod';

const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  // ... other fields
});

// In API route
const result = productSchema.safeParse(body);
if (!result.success) {
  return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
}
```

### XSS Prevention

- React automatically escapes content
- Never use `dangerouslySetInnerHTML` without sanitization
- Validate and sanitize all user input

### SQL Injection Prevention

- Not applicable (using Firestore, not SQL)
- Firestore automatically prevents injection attacks

## Common Vulnerabilities & Mitigations

### 1. Hardcoded Credentials

**❌ Bad:**
```typescript
if (user.email === 'admin@example.com') {
  return 'admin';
}
```

**✅ Good:**
```typescript
const userDoc = await getDoc(doc(db, 'users', uid));
return userDoc.data()?.role;
```

### 2. Client-Side Role Checks Only

**❌ Bad:**
```typescript
// Only checking role on client
if (role === 'admin') {
  await deleteProduct(id);
}
```

**✅ Good:**
```typescript
// Verify role on server + Firestore rules
// Client check is just for UX
// Server/Firestore enforces security
```

### 3. Exposing Sensitive Data

**❌ Bad:**
```typescript
return NextResponse.json({
  user: firebaseUser, // Contains sensitive data
});
```

**✅ Good:**
```typescript
return NextResponse.json({
  user: {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
  },
});
```

## Monitoring & Incident Response

### Logging

- All authentication attempts are logged
- Failed operations are logged with error details
- Use Vercel logs for monitoring

### Alerts

Set up alerts for:
- Multiple failed login attempts
- Unauthorized access attempts
- Unusual database activity

### Incident Response

If a security incident occurs:

1. **Immediately revoke compromised credentials**
2. **Review Firestore audit logs**
3. **Check for unauthorized data access**
4. **Update security rules if needed**
5. **Notify affected users if data was compromised**

## Security Checklist

### Before Deployment

- [ ] All environment variables are set in Vercel
- [ ] `.env.local` is not committed to git
- [ ] Firestore rules are deployed
- [ ] Admin users are properly configured
- [ ] No hardcoded credentials in code
- [ ] Input validation is implemented
- [ ] Error messages don't expose sensitive info

### Regular Maintenance

- [ ] Review Firestore rules quarterly
- [ ] Audit admin users monthly
- [ ] Check for dependency vulnerabilities (`npm audit`)
- [ ] Review access logs for suspicious activity
- [ ] Update Firebase SDK regularly
- [ ] Rotate API keys annually

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do not open a public issue**
2. Email security concerns to the project maintainer
3. Include detailed information about the vulnerability
4. Allow time for the issue to be fixed before public disclosure

## Additional Resources

- [Firebase Security Rules Documentation](https://firebase.google.com/docs/rules)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vercel Security](https://vercel.com/docs/security)

---

**Last Updated:** February 2026
