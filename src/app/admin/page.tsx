'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { withAuth } from '@/components/with-auth';
import { getProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import ProductFormDialog from '@/components/admin/product-form-dialog';
import { db } from '@/lib/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    const handleDelete = async (productId: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', productId));
                toast({
                    title: 'Product deleted',
                    description: 'The product has been removed.',
                });
                loadProducts();
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to delete product.',
                    variant: 'destructive',
                });
            }
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setIsDialogOpen(true);
    };

    const handleSaveSuccess = () => {
        setIsDialogOpen(false);
        setEditingProduct(null);
        loadProducts();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <Button onClick={handleLogout} variant="outline">
                    Logout
                </Button>
            </div>

            <Card className="mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Product Management</CardTitle>
                    <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-center text-muted-foreground">Loading products...</p>
                    ) : (
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground">{product.category}</p>
                                        <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <ProductFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                product={editingProduct}
                onSuccess={handleSaveSuccess}
            />
        </div>
    );
}

export default withAuth(AdminDashboard, { requiredRole: 'admin' });
