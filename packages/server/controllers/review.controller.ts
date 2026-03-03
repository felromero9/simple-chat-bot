import type { Request, Response } from 'express';
import { reviewServices } from '../services/review.services.ts';
import { reviewRepository } from '../repositories/review.repository.ts';

export const reviewController = {
    getReviews: async (req: Request, res: Response) => {
        const productId = Number(req.params.id);

        if (isNaN(productId))
            return res.status(400).json({ message: 'Invalid product id' });

        const reviews = await reviewRepository.getReviews(productId);
        const summary = await reviewRepository.getReviewSummary(productId);

        res.json({
            summary,
            reviews,
        });
    },

    summarizeReviews: async (req: Request, res: Response) => {
        const productId = Number(req.params.id);

        if (isNaN(productId))
            return res.status(400).json({ message: 'Invalid product id' });

        const summary = await reviewServices.summarizeReviews(productId);
        res.json({ summary });
    },
};
