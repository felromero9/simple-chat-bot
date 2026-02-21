import axios from 'axios';
import { useRef, useState } from 'react';
import { TypingIndicator } from '@/components/chat/TypingIndicator.tsx';
import {
    ChatMessages,
    ROLES,
    type Message,
} from '@/components/chat/ChatMessages.tsx';
import { ChatInput, type ChatFormData } from '@/components/chat/ChatInput.tsx';

type ChatResponse = {
    message: string;
};

export const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [error, setError] = useState('');
    const conversationId = useRef(crypto.randomUUID());

    const onSubmit = async ({ prompt }: ChatFormData) => {
        try {
            setMessages((prev) => [
                ...prev,
                { content: prompt, role: ROLES.User },
            ]);
            setIsBotTyping(true);
            setError('');

            const { data } = await axios.post<ChatResponse>('/api/chat', {
                prompt,
                conversationId: conversationId.current,
            });
            setMessages((prev) => [
                ...prev,
                { content: data.message, role: 'bot' },
            ]);
        } catch (error) {
            console.log(error);
            setError(`Something went wrong: ${error}`);
        } finally {
            setIsBotTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col gap-3 mb-10 overflow-auto">
                <ChatMessages messages={messages} />
                {isBotTyping && <TypingIndicator />}
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <ChatInput onSubmit={onSubmit} />
        </div>
    );
};
