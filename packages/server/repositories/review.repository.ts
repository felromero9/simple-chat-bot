import { PrismaClient, type Review } from '../generated/prisma/client.ts';

export const reviewRepository = {
    async getReviews(productId: number): Promise<Review[]> {
        const prisma = new PrismaClient();
        // SELECT * FROM reviews WHERE productId = @productId ORDER BY createdAt DESC
        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
        });
    },
};
