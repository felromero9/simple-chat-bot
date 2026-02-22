import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository.ts';
import template from '../prompts/chatbot.txt';

// Implementation detail
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const crossfitInfo = fs.readFileSync(
    path.join(__dirname, '..', 'prompts', 'CrossFitWorld.md'),
    'utf8'
);
const instructions = template.replace('{{boxInfo}}', crossfitInfo);

type ChatResponse = {
    id: string;
    message: string;
};

// Public interface
export const chatServices = {
    async sendMessage(
        prompt: string,
        conversationId: string
    ): Promise<ChatResponse> {
        const response = await client.responses.create({
            model: 'gpt-4o-mini',
            instructions,
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 100,
            previous_response_id:
                conversationRepository.getLastResponseId(conversationId),
        });

        conversationRepository.setLastResponseId(conversationId, response.id);
        return {
            id: response.id,
            message: response.output_text,
        };
    },
};
