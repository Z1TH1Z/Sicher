
import { adminAuth, adminDb } from './firebase-admin';

export async function verifyAdmin(request: Request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        console.warn('[Auth] Missing or invalid Authorization header');
        return null;
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        const uid = decodedToken.uid;

        // Check if user is admin in Firestore
        const userDoc = await adminDb.collection('users').doc(uid).get();
        if (!userDoc.exists || userDoc.data()?.role !== 'admin') {
            console.warn(`[Auth] User ${uid} is not an admin`);
            return null;
        }

        return decodedToken;
    } catch (error) {
        console.error('[Auth] Token verification failed:', error);
        return null;
    }
}
