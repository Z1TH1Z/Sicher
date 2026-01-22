

import { auth, db } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export type UserRole = 'admin' | 'customer';

export interface UserData {
    uid: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}

/**
 * Get user role from Firestore
 */
export async function getUserRole(uid: string): Promise<UserRole | null> {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data().role as UserRole;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user role:', error);
        return null;
    }
}

/**
 * Create user profile in Firestore
 */
export async function createUserProfile(uid: string, email: string, role: UserRole = 'customer') {
    try {
        await setDoc(doc(db, 'users', uid), {
            uid,
            email,
            role,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
}

/**
 * Sign up new customer
 */
export async function signUpCustomer(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(userCredential.user.uid, email, 'customer');
        // Return only serializable data - Server Actions cannot return Firebase User objects
        return {
            success: true,
            user: {
                uid: userCredential.user.uid,
                email: userCredential.user.email
            }
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Sign in user
 */
export async function signIn(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const role = await getUserRole(userCredential.user.uid);
        // Return only serializable data - Server Actions cannot return Firebase User objects
        return {
            success: true,
            user: {
                uid: userCredential.user.uid,
                email: userCredential.user.email
            },
            role
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Sign out user
 */
export async function signOut() {
    try {
        await firebaseSignOut(auth);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Check if user is admin
 */
export async function isAdmin(uid: string): Promise<boolean> {
    const role = await getUserRole(uid);
    return role === 'admin';
}
