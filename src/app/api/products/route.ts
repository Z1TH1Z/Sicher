
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAdmin } from '@/lib/auth-admin';
import { Product } from '@/lib/types';
import { products as staticProducts } from '@/lib/products';

export async function GET() {
    try {
        console.log('[API] Fetching products from Firestore (Admin SDK)...');
        const productsRef = adminDb.collection('products');
        const snapshot = await productsRef.get();

        const products: Product[] = [];
        snapshot.forEach((doc) => {
            products.push(doc.data() as Product);
        });

        console.log(`[API] Found ${products.length} products`);

        // If no products in database, return static products as fallback
        if (products.length === 0) {
            console.log('[API] No products in database, returning static products');
            return NextResponse.json(staticProducts);
        }

        return NextResponse.json(products);
    } catch (error: any) {
        console.error('[API] Error fetching products:', error);
        // Return static products as fallback on error
        console.log('[API] Returning static products as fallback');
        return NextResponse.json(staticProducts);
    }
}

export async function POST(request: Request) {
    try {
        const decodedToken = await verifyAdmin(request);
        if (!decodedToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        console.log('[API] Creating new product:', body.name);

        if (!body.id || !body.name || !body.price) {
            return NextResponse.json(
                { error: 'Missing required fields: id, name, price' },
                { status: 400 }
            );
        }

        await adminDb.collection('products').doc(body.id).set(body);

        return NextResponse.json({ success: true, product: body });
    } catch (error: any) {
        console.error('[API] Error creating product:', error);
        console.error('[API] Error details:', JSON.stringify(error, null, 2));
        return NextResponse.json(
            { error: 'Failed to create product', details: error.message },
            { status: 500 }
        );
    }
}
