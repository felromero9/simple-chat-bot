import { PrismaClient, type Review } from '../generated/prisma/client.ts';
import dayjs = require('dayjs');

const prisma = new PrismaClient();

export const reviewRepository = {
    async getReviews(productId: number, limit?: number): Promise<Review[]> {
        // SELECT * FROM reviews WHERE productId = @productId ORDER BY createdAt DESC
        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    },

    storeReviewSummary(productId: number, summary: string) {
        const now = new Date();
        const expiresAt = dayjs().add(5, 'day').toDate();

        const data = {
            content: summary,
            expiresAt,
            generatedAt: now,
            productId,
        };

        return prisma.summary.upsert({
            where: { productId },
            create: data,
            update: data,
        });
    },

    getReviewSummary(productId: number) {
        return prisma.summary.findUnique({
            where: { productId },
        });
    },
};
