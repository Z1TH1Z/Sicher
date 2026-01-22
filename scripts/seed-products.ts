/**
 * Seed Products Script
 * Run this script to populate your Firebase Firestore database with placeholder product data.
 * 
 * Usage: npx ts-node --project tsconfig.json scripts/seed-products.ts
 * Or add to package.json: "seed:products": "ts-node --project tsconfig.json scripts/seed-products.ts"
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
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

// Placeholder product data for Sicher Tech security products
const products = [
    {
        id: "st-cam-001",
        name: "Sentinel 4K AI Camera",
        description:
            "Ultra-high-definition 4K security camera with AI-powered person and vehicle detection. Weatherproof and night vision capable.",
        price: 249.99,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=4K+Camera",
        category: "Cameras",
        specs: {
            Resolution: "4K Ultra HD",
            "Field of View": "120°",
            "Night Vision": "Up to 100ft",
            "Power Source": "PoE (Power over Ethernet)",
            Weatherproof: "IP67 Rated",
        },
    },
    {
        id: "st-lock-002",
        name: "Aegis Smart Lock Pro",
        description:
            "Keyless entry smart lock with fingerprint, keypad, and app access. Features auto-lock and activity logs.",
        price: 199.99,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Smart+Lock",
        category: "Access Control",
        specs: {
            "Unlock Methods": "Fingerprint, Code, App, Key",
            "Battery Life": "12 months",
            Material: "Zinc Alloy",
            Compatibility: "iOS, Android, Alexa",
        },
    },
    {
        id: "st-alarm-003",
        name: "Guardian All-in-One Alarm",
        description:
            "Comprehensive home security system with door/window sensors, motion detector, and a central hub with a built-in siren.",
        price: 399.0,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Alarm+System",
        category: "Alarm Systems",
        specs: {
            "Kit Includes": "Hub, 2x Door Sensors, 1x Motion Sensor",
            Connectivity: "Wi-Fi, Cellular Backup",
            "Siren Volume": "105 dB",
            Monitoring: "Optional Professional Monitoring",
        },
    },
    {
        id: "st-dcam-004",
        name: "Doorbell Vision+",
        description:
            "Smart video doorbell with 2K resolution, two-way audio, and package detection. Never miss a visitor.",
        price: 179.5,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Doorbell",
        category: "Cameras",
        specs: {
            Resolution: "2K QHD",
            Audio: "Two-way with Noise Cancellation",
            Power: "Wired or Battery",
            Storage: "Local & Cloud Options",
        },
    },
    {
        id: "st-safe-005",
        name: "Fortress Biometric Safe",
        description:
            "A heavy-duty steel safe secured by a state-of-the-art biometric fingerprint scanner. Fireproof and waterproof for ultimate protection.",
        price: 499.99,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Safe",
        category: "Safes",
        specs: {
            Material: "12-gauge solid steel",
            "Fire Rating": "1 hour at 1700°F",
            Waterproof: "24 hours in 8ft of water",
            Capacity: "1.23 cubic feet",
        },
    },
    {
        id: "st-panel-006",
        name: "Command Center Touchscreen",
        description:
            "7-inch touchscreen hub to control all your Sicher Tech devices. Arm/disarm, view cameras, and manage access from one place.",
        price: 299.0,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Control+Panel",
        category: "Access Control",
        specs: {
            "Screen Size": "7 inches",
            Resolution: "1024 x 600",
            Connectivity: "Wi-Fi, Z-Wave, Bluetooth",
            Power: "AC Power with Battery Backup",
        },
    },
    {
        id: "st-sensor-007",
        name: "Enviro-Sensor Suite",
        description:
            "Monitor your environment with sensors for smoke, carbon monoxide, and water leaks. Get instant alerts on your phone.",
        price: 129.0,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Sensors",
        category: "Sensors",
        specs: {
            Sensors: "Smoke, CO, Water Leak",
            Connectivity: "Z-Wave",
            "Battery Life": "5 years",
            Compatibility: "Sicher Tech Command Center",
        },
    },
    {
        id: "st-solar-008",
        name: "Solar Panel for Cameras",
        description:
            "Keep your battery-powered cameras continuously charged with this efficient, weatherproof solar panel.",
        price: 59.99,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Solar+Panel",
        category: "Accessories",
        specs: {
            "Power Output": "5W",
            "Cable Length": "13ft (4m)",
            Weatherproof: "IP65",
            Compatibility: "Sentinel Battery Cam, Doorbell Vision+",
        },
    },
    {
        id: "st-motion-009",
        name: "ShadowSense Motion Detector",
        description:
            "Advanced PIR motion detector with pet immunity up to 85lbs. Perfect for indoor coverage with minimal false alarms.",
        price: 79.99,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Motion+Sensor",
        category: "Sensors",
        specs: {
            "Detection Range": "35ft",
            "Coverage Angle": "90°",
            "Pet Immunity": "Up to 85lbs",
            "Battery Life": "3 years",
        },
    },
    {
        id: "st-nvr-010",
        name: "Vault NVR 8-Channel",
        description:
            "Network Video Recorder with 8 PoE ports, 4TB storage, and remote viewing. Supports up to 4K resolution cameras.",
        price: 549.99,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=NVR",
        category: "Storage",
        specs: {
            Channels: "8 PoE ports",
            Storage: "4TB HDD included",
            "Max Resolution": "4K per channel",
            "Remote Access": "Mobile & Desktop Apps",
        },
    },
    {
        id: "st-keypad-011",
        name: "SecureEntry Keypad",
        description:
            "Weatherproof wireless keypad for arming/disarming your security system from the garage or outdoor areas.",
        price: 69.99,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Keypad",
        category: "Access Control",
        specs: {
            Backlit: "Yes, LED",
            Weatherproof: "IP55",
            "Battery Life": "2 years",
            Connectivity: "Encrypted Wireless",
        },
    },
    {
        id: "st-glass-012",
        name: "CrystalGuard Glass Break Sensor",
        description:
            "Acoustic glass break detector that covers up to 25ft radius. Instantly triggers alarm when glass shattering is detected.",
        price: 49.99,
        image: "https://placehold.co/600x600/1a1a2e/e94560?text=Glass+Sensor",
        category: "Sensors",
        specs: {
            "Coverage Radius": "25ft",
            "Detection Method": "Acoustic",
            "False Alarm Prevention": "Dual-stage detection",
            "Battery Life": "5 years",
        },
    },
];

async function seedProducts() {
    console.log("🚀 Starting product seeding to Firebase Firestore...\n");
    console.log(`📊 Firebase Project: ${firebaseConfig.projectId}`);
    console.log(`📦 Products to seed: ${products.length}\n`);

    try {
        for (const product of products) {
            const docRef = doc(collection(db, "products"), product.id);
            await setDoc(docRef, product);
            console.log(`✅ Added: ${product.name} (${product.id})`);
        }

        console.log("\n🎉 Successfully seeded all products to Firestore!");
        console.log(`📊 Total products added: ${products.length}`);
    } catch (error) {
        console.error("\n❌ Error seeding products:", error);
        process.exit(1);
    }

    process.exit(0);
}

seedProducts();
