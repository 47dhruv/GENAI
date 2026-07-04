/**
 * ============================================================================
 * Badge Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * - Displays small status badges or labels.
 *
 * Props:
 * - label: Badge text
 * - className: Additional tailwind classes
 *
 * Future Improvements:
 * - Add accent color options
 * - Add pill / outline variants
 * ============================================================================
 */

const Badge = ({ label, className = '' }) => (
    <span className={`inline-flex rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)] ${className}`}>
        {label}
    </span>
);

export default Badge;
