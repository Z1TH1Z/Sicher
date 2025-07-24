"use client";

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { getProductRecommendations } from '@/app/actions';
import { products } from '@/lib/products';
import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { Skeleton } from './ui/skeleton';

export default function Recommendations({ currentProductId }: { currentProductId: string }) {
  const { cartItems } = useCart();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      const cartContents = cartItems.map(item => item.product.id);
      const input = {
        browsingHistory: [currentProductId],
        cartContents: cartContents,
      };

      try {
        const result = await getProductRecommendations(input);
        if (result.recommendedProducts) {
          const recs = products.filter(p => result.recommendedProducts?.includes(p.id) && p.id !== currentProductId);
          // If AI returns nothing, show some other products as fallback
          if (recs.length === 0) {
            const fallbackRecs = products.filter(p => p.id !== currentProductId).slice(0, 4);
            setRecommendedProducts(fallbackRecs);
          } else {
             setRecommendedProducts(recs.slice(0, 4));
          }
        } else {
            const fallbackRecs = products.filter(p => p.id !== currentProductId).slice(0, 4);
            setRecommendedProducts(fallbackRecs);
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        const fallbackRecs = products.filter(p => p.id !== currentProductId).slice(0, 4);
        setRecommendedProducts(fallbackRecs);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentProductId, cartItems]);

  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))
        ) : (
          recommendedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}
