import { Button } from '@/components/ui/button.tsx';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import type { KeyboardEvent } from 'react';

export type ChatFormData = {
    prompt: string;
};

type Props = {
    onSubmit: (data: ChatFormData) => void;
};

export const ChatInput = ({ onSubmit }: Props) => {
    const { register, handleSubmit, reset, formState } =
        useForm<ChatFormData>();

    const submit = handleSubmit((data) => {
        reset({ prompt: '' });
        onSubmit(data);
    });

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    return (
        <form
            onSubmit={submit}
            onKeyDown={handleKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-4xl"
        >
            <textarea
                {...register('prompt', {
                    required: true,
                    validate: (data) => data.trim().length > 0,
                })}
                autoFocus
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
    );
};
