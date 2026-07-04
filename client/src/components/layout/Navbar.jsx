import { Avatar, ThemeToggle } from '../ui';

/**
 * ============================================================================
 * Navbar Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * Displays the top navigation bar of the application.
 *
 * Features:
 * - Hamburger menu for sidebar toggle
 * - Application branding / Current persona
 * - Theme toggle and user avatar
 * - Responsive layout
 * ============================================================================
 */

const Navbar = ({ activePersona, isSidebarOpen, onToggleSidebar }) => (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--card)] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                    aria-expanded={isSidebarOpen}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[var(--muted)] transition-colors hover:bg-[var(--panel)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border)]"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="space-y-0.5">
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--faint)]">Current persona</p>
                    <h1 className="text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">{activePersona?.name}</h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />
                <Avatar label="U" />
            </div>
        </div>
    </header>
);

export default Navbar;
