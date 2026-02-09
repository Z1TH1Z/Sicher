
import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!getApps().length) {
    if (serviceAccount.clientEmail && serviceAccount.privateKey && serviceAccount.projectId) {
        initializeApp({
            credential: cert(serviceAccount),
        });
    } else {
        console.warn('Firebase Admin Service Account not configured properly. Some features may not work.');
    }
}

const adminDb = getFirestore();
const adminAuth = getAuth(getApp());

export { adminDb, adminAuth };
