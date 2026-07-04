/**
 * ============================================================================
 * Avatar Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * - Displays a rounded user avatar placeholder.
 * ============================================================================
 */

const Avatar = ({ label = 'U', className = '' }) => (
    <div
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent-text)] ${className}`}
        aria-label={`User avatar: ${label}`}
    >
        {label}
    </div>
);

export default Avatar;
