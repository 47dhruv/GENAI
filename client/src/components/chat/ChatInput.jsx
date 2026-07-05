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

const CHAR_LIMIT = 240;

const ChatInput = ({ message, onChange, onSend, isLoading = false, isDisabled = false }) => {
    const remainingCharacters = useMemo(() => CHAR_LIMIT - message.length, [message.length]);
    const usedRatio = useMemo(() => Math.min(message.length / CHAR_LIMIT, 1), [message.length]);
    const sendDisabled = isLoading || isDisabled || !message.trim();
    const isNearLimit = remainingCharacters <= 20;

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!sendDisabled) {
                onSend();
            }
        }
    };

    // Ring geometry for the minimal character-usage indicator
    const radius = 8;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - usedRatio);

    return (
        <footer className="border-t border-[var(--border)]/70 bg-[var(--background)]/95 backdrop-blur-sm px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-4xl">
                <div
                    className={`group flex items-center gap-1.5 rounded-[1.75rem] border bg-[var(--panel)]/80 backdrop-blur-md pl-4 pr-1.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out
                        ${isDisabled ? 'border-[var(--border)] opacity-70' : 'border-[var(--border)] focus-within:border-[var(--accent)]/60 focus-within:shadow-[0_0_0_4px_var(--accent-soft)]'}
                    `}
                >
                    <button
                        type="button"
                        disabled={isDisabled}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--faint)] transition-all duration-200 hover:bg-[var(--surface)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        aria-label="Attach file"
                    >
                        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>

                    <input
                        type="text"
                        value={message}
                        placeholder={isDisabled ? 'Daily question limit reached.' : 'Ask your AI persona a question…'}
                        onChange={(event) => onChange(event.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading || isDisabled}
                        maxLength={CHAR_LIMIT}
                        className="min-w-0 flex-1 border-0 bg-transparent px-1 py-2.5 text-[0.925rem] font-normal tracking-[-0.01em] text-[var(--text)] outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed"
                    />

                    {/* Minimal ring-style character usage indicator, replaces raw numeral */}
                    {message.length > 0 && (
                        <div
                            className="hidden shrink-0 items-center justify-center sm:flex"
                            title={`${remainingCharacters} characters remaining`}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" className="-rotate-90">
                                <circle cx="10" cy="10" r={radius} fill="none" stroke="var(--border)" strokeWidth="1.5" />
                                <circle
                                    cx="10"
                                    cy="10"
                                    r={radius}
                                    fill="none"
                                    stroke={isNearLimit ? '#e0724c' : 'var(--accent)'}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashOffset}
                                    className="transition-all duration-200 ease-out"
                                />
                            </svg>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={onSend}
                        disabled={sendDisabled}
                        aria-label={isLoading ? 'Sending message' : 'Send message'}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-sm transition-all duration-200 ease-out hover:opacity-90 active:scale-[0.94] disabled:cursor-not-allowed disabled:bg-[var(--border)] disabled:text-[var(--faint)] disabled:shadow-none"
                    >
                        {isLoading ? (
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
                            </svg>
                        ) : (
                            <svg className="h-[18px] w-[18px] -translate-y-px translate-x-px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        )}
                    </button>
                </div>

                {isDisabled && (
                    <p className="mt-2 px-4 text-xs text-[var(--faint)]">
                        You've reached today's limit — come back tomorrow for more questions.
                    </p>
                )}
            </div>
        </footer>
    );
};

export default ChatInput;