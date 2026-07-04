/**
 * ============================================================================
 * Message Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * - Renders a single chat message in the conversation.
 * - Distinguishes user and assistant messages.
 * ============================================================================
 */

const Message = ({ sender, text }) => {
    const isUser = sender === 'user';
    const alignment = isUser ? 'justify-end' : 'justify-start';
    
    // User: right-aligned, solid accent, sharp bottom-right
    // Assistant: left-aligned, card background, sharp bottom-left
    const bubbleStyles = isUser
        ? 'bg-[var(--accent)] text-white rounded-br-none'
        : 'bg-[var(--card)] border border-[var(--border)] text-[var(--text)] rounded-bl-none shadow-sm';

    return (
        <article className={`flex w-full ${alignment} mb-2`}>
            <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-6 transition-all duration-200 ${bubbleStyles}`}>
                <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] mb-1.5 ${isUser ? 'text-white/70' : 'text-[var(--faint)]'}`}>
                    {isUser ? 'You' : 'Assistant'}
                </div>
                <p className="whitespace-pre-wrap break-words">{text}</p>
            </div>
        </article>
    );
};

export default Message;
