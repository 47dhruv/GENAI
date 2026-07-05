import { Avatar, Badge } from '../ui';
import ThemeToggle from '../ui/ThemeToggle';

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
        return null;
    }
};

/**
 * ============================================================================
 * Navbar Component
 * ----------------------------------------------------------------------------
 * Purpose:
 * - Top bar for the chat screen: sidebar toggle, active persona, daily quota.
 *
 * Props:
 * - activePersona: the currently selected persona ({ id, name, role })
 * - isSidebarOpen: whether the sidebar is currently visible
 * - onToggleSidebar: toggles sidebar visibility
 * - quota: { remaining, limit } | null
 *
 * Note: this file wasn't shared in the original brief, so it's rebuilt from
 * how it's consumed in Home.jsx. Swap in the real file if this doesn't match
 * its current props/behaviour exactly. Adjust the ThemeToggle import path if
 * it isn't re-exported from '../ui'.
 * ============================================================================
 */

const Navbar = ({ activePersona, isSidebarOpen, onToggleSidebar, quota }) => {
    const remaining = quota?.remaining;
    const limit = quota?.limit ?? 40;
    const isLow = typeof remaining === 'number' && remaining <= 5;
    const isExhausted = remaining === 0;
    const user = getStoredUser();

    return (
        <header className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-4 py-3.5 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    aria-label={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--faint)] transition-colors duration-200 hover:bg-[var(--panel)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)]"
                >
                    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                    </svg>
                </button>

                <div className="flex min-w-0 items-center gap-2.5">
                    <p className="truncate text-sm font-semibold text-[var(--text)]">
                        {activePersona?.name || 'Select a persona'}
                    </p>
                    {activePersona?.role && (
                        <Badge label={activePersona.role} className="hidden shrink-0 normal-case tracking-normal sm:inline-flex" />
                    )}
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
                    <div
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
                            isExhausted
                                ? 'border-red-400/30 bg-red-400/10 text-red-400'
                                : isLow
                                    ? 'border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[var(--accent-text)]'
                                    : 'border-[var(--border)] bg-[var(--panel)] text-[var(--muted)]'
                        }`}
                    >
                        <span className="hidden sm:inline">Questions</span>
                        <span className="font-semibold">
                            {typeof remaining === 'number' ? `${remaining}/${limit}` : '--/40'}
                        </span>
                    </div>

                <ThemeToggle />

                <Avatar
                    src={user?.picture}
                    alt={user?.name}
                    label={user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    className="h-8 w-8 text-xs"
                />
            </div>
        </header>
    );
};

export default Navbar;