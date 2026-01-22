import { getProducts } from '@/lib/products';
import ProductCard from '@/components/product-card';

export const revalidate = 0; // Ensure fresh data on every request

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Our Products</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Explore our complete range of professional security solutions, from AI-powered cameras to smart locks and sensors.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
