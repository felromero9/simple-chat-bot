import { reviewRepository } from '../repositories/review.repository.ts';
import { llmClient } from '../llm/client.ts';
import template from '../prompts/summarize-reviews.txt';

export const reviewServices = {
    async summarizeReviews(productId: number): Promise<string> {
        const existingSummary =
            await reviewRepository.getReviewSummary(productId);

        if (existingSummary) return existingSummary;

        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews.map((r) => r.content).join('\n');
        const prompt = template.replace('{{reviews}}', joinedReviews);

        // Send the reviews to a LLM
        const { text: summary } = await llmClient.generateText({
            model: 'gpt-4o-mini',
            prompt,
            temperature: 0.2,
            maxTokens: 500,
        });

        await reviewRepository.storeReviewSummary(productId, summary);
        return summary;
    },
};
