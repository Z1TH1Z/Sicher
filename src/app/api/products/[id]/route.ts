
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verifyAdmin } from '@/lib/auth-admin';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const decodedToken = await verifyAdmin(request);
        if (!decodedToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        console.log(`[API] Deleting product: ${id}`);
        await adminDb.collection('products').doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[API] Error deleting product:', error);
        console.error('[API] Error details (full):', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        return NextResponse.json(
            { error: 'Failed to delete product', details: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const decodedToken = await verifyAdmin(request);
        if (!decodedToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        console.log(`[API] Updating product: ${id}`);

        // Remove id from body to avoid overwriting it (though Firestore handles it fine)
        const { id: _, ...updateData } = body;

        await adminDb.collection('products').doc(id).update(updateData);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[API] Error updating product:', error);
        console.error('[API] Error details (full):', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        return NextResponse.json(
            { error: 'Failed to update product', details: error.message },
            { status: 500 }
        );
    }
}
