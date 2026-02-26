import { type Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository.ts';

export const reviewServices = {
    async getReviews(productId: number): Promise<Review[]> {
        return reviewRepository.getReviews(productId);
    },
};
