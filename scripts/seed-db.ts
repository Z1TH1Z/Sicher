
import { db } from "../src/lib/firebase";
import { products } from "../src/lib/products";
import { collection, doc, setDoc } from "firebase/firestore";

async function seedProducts() {
    console.log("Seeding products...");
    const productsCollection = collection(db, "products");

    for (const product of products) {
        try {
            await setDoc(doc(productsCollection, product.id), product);
            console.log(`Added product: ${product.name}`);
        } catch (error) {
            console.error(`Error adding product ${product.name}:`, error);
        }
    }
    console.log("Seeding complete!");
}

// Check if run directly
if (typeof require !== 'undefined' && require.main === module) {
    seedProducts();
}

export { seedProducts };
