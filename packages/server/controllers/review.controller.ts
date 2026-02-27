import type { Request, Response } from 'express';
import { reviewServices } from '../services/review.services.ts';

export const reviewController = {
    getReviews: async (req: Request, res: Response) => {
        const productId = Number(req.params.id);

        if (isNaN(productId))
            return res.status(400).json({ message: 'Invalid product id' });

        try {
            const reviews = await reviewServices.getReviews(productId);
            res.json(reviews);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        }
    },

    summarizeReviews: async (req: Request, res: Response) => {
        const productId = Number(req.params.id);

        if (isNaN(productId))
            return res.status(400).json({ message: 'Invalid product id' });

        const summary = await reviewServices.summarizeReviews(productId);
        res.json({ summary });
    },
};
