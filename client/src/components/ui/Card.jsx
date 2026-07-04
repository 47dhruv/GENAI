/**
 * ============================================================================
 * Card Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * - Provides a flexible surface container with subtle glassmorphism.
 * ============================================================================
 */

const Card = ({ className = '', children, ...props }) => (
    <div
        {...props}
        className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm ${className}`}
    >
        {children}
    </div>
);

export default Card;
