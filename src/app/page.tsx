import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/product-card';

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Premium Security
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professional-grade protection for modern living
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="#products">
                  Shop Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8">
                <Link href="/account">
                  My Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular security solutions
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Sicher Tech?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-leading security solutions with unparalleled support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-background rounded-lg p-8 shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Expert-Vetted</h3>
                <p className="text-muted-foreground">
                  Every product tested by security professionals
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-background rounded-lg p-8 shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Always here to help with any questions
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-background rounded-lg p-8 shadow-sm border">
                <h3 className="text-xl font-semibold mb-3">Secure Checkout</h3>
                <p className="text-muted-foreground">
                  Shop with confidence using encrypted payments
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
