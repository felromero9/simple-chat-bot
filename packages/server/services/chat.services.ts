import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository.ts';
import template from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client.ts';

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
        const response = await llmClient.generateText({
            model: 'gpt-4o-mini',
            instructions,
            prompt,
            temperature: 0.2,
            maxTokens: 100,
            previousResponseId:
                conversationRepository.getLastResponseId(conversationId),
        });

        conversationRepository.setLastResponseId(conversationId, response.id);
        return {
            id: response.id,
            message: response.text,
        };
    },
};
