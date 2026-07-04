/**
 * ============================================================================
 * Button Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * - Provides a reusable button component with consistent spacing and states.
 * ============================================================================
 */

const variants = {
    primary:
        'bg-[var(--accent)] text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] shadow-sm',
    secondary:
        'border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] hover:bg-[var(--sidebar)] focus-visible:ring-2 focus-visible:ring-[var(--border)] shadow-sm',
    ghost:
        'bg-transparent text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--panel)] focus-visible:ring-2 focus-visible:ring-[var(--border)]',
};

const Button = ({ variant = 'primary', className = '', children, ...props }) => (
    <button
        {...props}
        className={`inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none ${variants[variant]} ${className}`}
    >
        {children}
    </button>
);

export default Button;
