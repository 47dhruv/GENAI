import { useMemo } from 'react';

/**
 * ============================================================================
 * ChatInput Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * Provides the input area where users can type and send messages.
 *
 * Features:
 * - Controlled input component
 * - Send button
 * - Enter key support
 * - Responsive layout
 * ============================================================================
 */

const ChatInput = ({ message, onChange, onSend }) => {
    const remainingCharacters = useMemo(() => 240 - message.length, [message.length]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSend();
        }
    };

    return (
        <footer className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-4xl">
                <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] pl-5 pr-1.5 py-1.5 shadow-sm focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent-soft)] transition-all duration-200">
                    <button 
                        type="button" 
                        className="text-[var(--faint)] transition-colors hover:text-[var(--text)] focus-visible:outline-none"
                        aria-label="Attach file"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>
                    
                    <input
                        type="text"
                        value={message}
                        placeholder="Ask your AI persona a question..."
                        onChange={(event) => onChange(event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border-0 bg-transparent px-2 py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
                    />
                    
                    <span className="hidden text-[10px] uppercase tracking-wider text-[var(--faint)] sm:block pr-2">
                        {remainingCharacters}
                    </span>
                    
                    <button
                        type="button"
                        onClick={onSend}
                        className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    >
                        Send
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default ChatInput;
