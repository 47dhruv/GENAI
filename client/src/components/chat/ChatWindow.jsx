import { useEffect, useRef, useState } from 'react';

import Message from './Message';

/**
 * ============================================================================
 * ChatWindow Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * Displays the complete conversation between the user and the AI persona.
 *
 * Features:
 * - Scrollable chat area
 * - Automatic scroll to latest message
 * - Welcome/empty state
 * - Clean and responsive layout
 *
 * Props:
 * - messages: Array containing all chat messages
 *
 * Future Improvements:
 * - Typing indicator
 * - Streaming responses
 * - Markdown rendering
 * - Code syntax highlighting
 * - Copy message
 * - Message timestamps
 * - Scroll-to-bottom button
 * ============================================================================
 */

const loadingMessages = ['Assistant thinking', 'Analysing', 'Working'];

const ChatWindow = ({ messages, isLoading = false }) => {
    const bottomRef = useRef(null);
    const [loadingIndex, setLoadingIndex] = useState(0);
    const hasMessages = messages.length > 0;

    useEffect(() => {
        if (!isLoading) {
            setLoadingIndex(0);
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            setLoadingIndex((currentIndex) => (currentIndex + 1) % loadingMessages.length);
        }, 900);

        return () => window.clearInterval(intervalId);
    }, [isLoading]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages, isLoading]);

    if (!hasMessages && !isLoading) {
        return (
            <section className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-10">
                <div className="max-w-md text-center">
                    <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-sm font-semibold tracking-tight text-[var(--accent-text)]">
                        AI
                    </span>
                    <h2 className="text-xl font-semibold tracking-[-0.01em] text-[var(--text)]">
                        Start a conversation
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-sm text-[0.9rem] leading-6 text-[var(--muted)]">
                        Pick a persona from the sidebar and ask a question — responses appear here as they arrive.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-1">
                {messages.map((message, index) => (
                    <Message key={`${message.sender}-${index}`} sender={message.sender} text={message.text} />
                ))}
                {isLoading && (
                    <Message sender="assistant" text={`${loadingMessages[loadingIndex]}…`} />
                )}
                <div ref={bottomRef} />
            </div>
        </section>
    );
};

export default ChatWindow;