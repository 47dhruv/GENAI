import { useEffect, useRef } from 'react';

import { Badge, Card } from '../ui';
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
 * - Welcome banner
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

const ChatWindow = ({ messages }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    return (
        <section className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
                <Card className="overflow-hidden p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-4">
                            <Badge label="Welcome" />
                            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
                                A premium space for smart AI conversations.
                            </h2>
                            <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
                                Keep the context clear, the layout calm, and the chat experience focused.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 shadow-sm">
                                <p className="text-sm font-semibold text-[var(--text)]">Refined workflow</p>
                                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Organized message flow with premium spacing.</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 shadow-sm">
                                <p className="text-sm font-semibold text-[var(--text)]">Ready for scale</p>
                                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Designed for future AI features and workflows.</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="space-y-5">
                    {messages.map((message, index) => (
                        <Message key={`${message.sender}-${index}`} sender={message.sender} text={message.text} />
                    ))}
                    <div ref={bottomRef} />
                </div>
            </div>
        </section>
    );
};

export default ChatWindow;
