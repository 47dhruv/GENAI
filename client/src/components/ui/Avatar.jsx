/**
 * ============================================================================
 * Avatar Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * - Displays a rounded user avatar.
 * ============================================================================
 */

const Avatar = ({ label = 'U', src, alt, className = '' }) => (
    <div className={`relative flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent-text)] ${className}`} aria-label={alt || `User avatar: ${label}`}>
        {src ? (
            <img src={src} alt={alt || label} className="h-full w-full object-cover" />
        ) : (
            <span>{label}</span>
        )}
    </div>
);

export default Avatar;
