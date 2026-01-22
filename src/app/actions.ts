"use server";

import { recommendProducts } from '@/ai/flows/product-recommendations';
import type { RecommendProductsInput } from '@/ai/flows/product-recommendations';

export async function getProductRecommendations(input: RecommendProductsInput) {
  try {
    const result = await recommendProducts(input);
    if (result && result.recommendedProducts) {
      return { recommendedProducts: result.recommendedProducts };
    }
    return { recommendedProducts: [] };

  } catch (error) {
    console.error('Error getting product recommendations:', error);
    return { error: 'An unexpected error occurred while fetching recommendations.' };
  }
}
