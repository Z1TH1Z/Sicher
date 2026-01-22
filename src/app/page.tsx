import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-32 pb-16 md:pb-20 lg:pb-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary mb-6 animate-fade-in-up">
                <ShieldCheck className="mr-1 h-3 w-3" /> Secure Your World
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight animate-fade-in-up delay-100">
                Advanced Security <br className="hidden lg:block" />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Technology
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
                Professional-grade protection for your home and business. Experience peace of mind with our AI-powered security ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
                <Button asChild size="lg" className="h-12 px-8 text-base">
                  <Link href="#featured-products">
                    Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                  <Link href="/account">
                    View Dashboard
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual Element / Abstraction */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none animate-fade-in-scale delay-200">
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-32 h-32 text-primary/20" />
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              </div>
            </div>
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
