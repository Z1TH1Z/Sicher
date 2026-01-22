"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input 
        type="number" 
        min="1" 
        value={quantity}
        onChange={handleQuantityChange}
        className="w-20"
      />
      <Button size="lg" onClick={handleAddToCart} className="flex-1">
        <ShoppingCart className="mr-2" />
        Add to Cart
      </Button>
    </div>
  );
}
