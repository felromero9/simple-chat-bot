import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';

export const ROLES = {
    User: 'User',
    Bot: 'Bot',
};

type Role = (typeof ROLES)[keyof typeof ROLES];

export type Message = {
    content: string;
    role: Role;
};

type Props = {
    messages: Message[];
};

export const ChatMessages = ({ messages }: Props) => {
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col gap-3">
            {messages.map((message, index) => (
                <div
                    key={index}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    className={`px-3 py-1  max-w-md rounded-2xl 
                         ${
                             message.role === ROLES.User
                                 ? 'bg-blue-700 text-white self-end'
                                 : ' bg-gray-200 text-black self-start'
                         }`}
                >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            ))}
        </div>
    );
};
