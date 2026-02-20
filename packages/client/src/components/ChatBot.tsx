import { FaArrowUp } from 'react-icons/fa6';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import React, { useRef, useState } from 'react';
import axios from 'axios';

type FormData = {
    prompt: string;
};

type ChatResponse = {
    message: string;
};

const ROLES = {
    User: 'User',
    Bot: 'Bot',
};

type Role = (typeof ROLES)[keyof typeof ROLES];

type Message = {
    content: string;
    role: Role;
};

export const ChatBot = () => {
    const [message, setMessage] = useState<Message[]>([]);
    const conversationId = useRef(crypto.randomUUID());
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    const onSubmit = async ({ prompt }: FormData) => {
        setMessage((prev) => [...prev, { content: prompt, role: ROLES.User }]);
        reset();

        const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
        });
        setMessage((prev) => [...prev, { content: data.message, role: 'bot' }]);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-3 mb-10">
                {message.map((message, index) => (
                    <p
                        key={index}
                        className={`px-3 py-1 rounded-2xl 
                         ${
                             message.role === ROLES.User
                                 ? 'bg-blue-700 text-white self-end'
                                 : ' bg-gray-200 text-black self-start'
                         }`}
                    >
                        {message.content}
                    </p>
                ))}
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                className="flex flex-col gap-2 items-end border-2 p-4 rounded-4xl"
            >
                <textarea
                    {...register('prompt', {
                        required: true,
                        validate: (data) => data.trim().length > 0,
                    })}
                    className="w-full focus:outline-0 resize-none border-0"
                    placeholder="Ask me anything"
                    maxLength={1_000}
                />
                <Button
                    disabled={!formState.isValid}
                    className="rounded-full w-9 h-9"
                >
                    <FaArrowUp />
                </Button>
            </form>
        </div>
    );
};
