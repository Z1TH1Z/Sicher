import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-8 md:gap-16">
      <section className="bg-card border-b">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
            Advanced Security Technology
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our curated selection of cutting-edge security products designed for reliability and peace of mind.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#featured-products">
                Shop Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/account">
                My Account
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured-products" className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center tracking-tight mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
       <section className="container mx-auto px-4 text-center my-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Sicher Tech?</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground mb-8">
            We provide industry-leading security solutions with unparalleled support and expertise. Your safety is our priority.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Expert-Vetted</h3>
              <p className="text-muted-foreground">Every product is tested and approved by security professionals.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Our team is always here to help you with any questions or concerns.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
              <p className="text-muted-foreground">Shop with confidence using our encrypted payment system.</p>
            </div>
          </div>
      </section>
    </div>
  );
}
