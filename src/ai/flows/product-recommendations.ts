// Product recommendations based on browsing history and cart contents.

'use server';

/**
 * @fileOverview Recommends products to users based on their browsing history and cart contents.
 *
 * - recommendProducts - A function that handles the product recommendation process.
 * - RecommendProductsInput - The input type for the recommendProducts function.
 * - RecommendProductsOutput - The return type for the recommendProducts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendProductsInputSchema = z.object({
  browsingHistory: z.array(z.string()).describe('An array of product IDs representing the user\'s browsing history.'),
  cartContents: z.array(z.string()).describe('An array of product IDs representing the items currently in the user\'s cart.'),
});
export type RecommendProductsInput = z.infer<typeof RecommendProductsInputSchema>;

const RecommendProductsOutputSchema = z.object({
  recommendedProducts: z.array(z.string()).describe('An array of product IDs representing the recommended products.'),
});
export type RecommendProductsOutput = z.infer<typeof RecommendProductsOutputSchema>;

export async function recommendProducts(input: RecommendProductsInput): Promise<RecommendProductsOutput> {
  return recommendProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProductsPrompt',
  input: { schema: RecommendProductsInputSchema },
  output: { schema: RecommendProductsOutputSchema },
  prompt: `You are a world-class security consultant for Sicher Tech. Your goal is to keep the user safe by suggesting a comprehensive security setup.
  
  Analyze their browsing history and cart to understand their current security coverage.
  - If they have cameras, suggest locks or sensors to secure physical access.
  - If they have sensors, suggest cameras for visual verification.
  - Always consider "blind spots" in a typical home approach.
  - Prioritize "Peace of Mind" and "Complete Protection".

  Browsing History (Product IDs): {{#each browsingHistory}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Cart Contents (Product IDs): {{#each cartContents}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Return a list of 3-5 Product IDs that would best complement their current selection.
  Recommended Products:`,
});

const recommendProductsFlow = ai.defineFlow(
  {
    name: 'recommendProductsFlow',
    inputSchema: RecommendProductsInputSchema,
    outputSchema: RecommendProductsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
