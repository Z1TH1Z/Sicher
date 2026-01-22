import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainProductInputSchema = z.object({
    productName: z.string(),
    productDescription: z.string(),
    userQuestion: z.string().optional(),
});

const ExplainProductOutputSchema = z.object({
    explanation: z.string(),
    keyBenefits: z.array(z.string()),
});

export const explainProductFlow = ai.defineFlow(
    {
        name: 'explainProductFlow',
        inputSchema: ExplainProductInputSchema,
        outputSchema: ExplainProductOutputSchema,
    },
    async (input) => {
        const prompt = await ai.generate({
            prompt: `Explain the security product "${input.productName}" to a homeowner.
      
      Description: ${input.productDescription}
      ${input.userQuestion ? `User Question: ${input.userQuestion}` : ''}
      
      Provide a simple, reassuring explanation of how this keeps them safe, and list 3 key benefits.
      Return JSON with 'explanation' and 'keyBenefits'.`,
            output: { schema: ExplainProductOutputSchema }
        });

        return prompt.output!;
    }
);
