/**
 * Promote User to Admin Script
 * 
 * This script promotes a user to admin role in Firestore.
 * Run this script with the user's email to grant admin access.
 * 
 * Usage: npx tsx scripts/promote-admin.ts <user-email>
 * Example: npx tsx scripts/promote-admin.ts admin@example.com
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function promoteToAdmin(email: string) {
    console.log(`🔍 Searching for user with email: ${email}\n`);

    try {
        // Query users collection for the email
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error(`❌ No user found with email: ${email}`);
            console.log("\n💡 Make sure the user has signed up first!");
            process.exit(1);
        }

        // Update the user's role to admin
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        const userData = userDoc.data();

        console.log(`✅ Found user: ${userData.email}`);
        console.log(`   User ID: ${userId}`);
        console.log(`   Current Role: ${userData.role}\n`);

        if (userData.role === 'admin') {
            console.log(`ℹ️  User is already an admin!`);
            process.exit(0);
        }

        // Update role to admin
        await updateDoc(doc(db, "users", userId), {
            role: "admin"
        });

        console.log(`🎉 Successfully promoted ${email} to admin!`);
        console.log(`\n⚠️  The user will need to log out and log back in for changes to take effect.`);
    } catch (error) {
        console.error("\n❌ Error promoting user:", error);
        process.exit(1);
    }

    process.exit(0);
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
    console.error("❌ Please provide a user email as an argument");
    console.log("\nUsage: npx tsx scripts/promote-admin.ts <user-email>");
    console.log("Example: npx tsx scripts/promote-admin.ts admin@example.com\n");
    process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    console.error("❌ Invalid email format");
    process.exit(1);
}

promoteToAdmin(email);
