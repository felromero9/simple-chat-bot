import type { Request, Response } from 'express';
import { chatServices } from '../services/chat.services.ts';
import z from 'zod';

// Implementation detail
const chatSchema = z.object({
    prompt: z
        .string()
        .trim()
        .min(1, 'Prompt is required')
        .max(1_000, 'Prompt is too long'),
    conversationId: z.uuid(),
});

// Public interface
export const chatController = {
    async sendMessage(req: Request, res: Response) {
        const parseResult = chatSchema.safeParse(req.body);
        if (!parseResult.success) {
            const flat = z.flattenError(parseResult.error);
            res.status(400).json(flat);
            return;
        }

        try {
            const { prompt, conversationId } = req.body;
            const response = await chatServices.sendMessage(
                prompt,
                conversationId
            );

            res.json({ message: response.message });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error });
        }
    },
};
