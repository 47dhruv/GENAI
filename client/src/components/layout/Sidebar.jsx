import { useEffect, useState } from 'react';
import { Button } from '../ui';
import api from '../../services/api';

const Sidebar = ({ personas, activePersona, onSelectPersona, onNewChat, onSelectChat, activeChatId }) => {
    const activePersonaId = activePersona?.id;
    const [chats, setChats] = useState([]);
    const [isLoadingChats, setIsLoadingChats] = useState(false);

    const fetchChats = async () => {
        setIsLoadingChats(true);
        try {
            const response = await api.get('/chats');
            setChats(response?.data?.data || []);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        } finally {
            setIsLoadingChats(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [activeChatId]); // refetch whenever a new chat is created/switched, so list stays fresh

    const formatUpdatedAt = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    return (
        <aside className="flex h-full w-full flex-col border-r border-[var(--border)] bg-[var(--sidebar)] px-4 py-5">
            <div className="mb-7 flex items-center gap-2.5 px-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] font-mono text-[11px] font-semibold text-[var(--accent-text)]">
                    AI
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--faint)]">
                    ~/workspace
                </p>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto pr-1">
                <div className="space-y-1.5">
                    <p className="px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--faint)]">Personas</p>
                    <div className="space-y-1">
                        {personas.map((persona) => {
                            const isActive = persona.id === activePersonaId;

                            return (
                                <button
                                    key={persona.id}
                                    type="button"
                                    onClick={() => onSelectPersona(persona)}
                                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200
                                        ${isActive ? 'bg-[var(--accent-soft)]' : 'hover:bg-[var(--panel)]'}
                                    `}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
                                            isActive ? 'bg-[var(--accent)]' : 'bg-[var(--border)] group-hover:bg-[var(--faint)]'
                                        }`}
                                    />
                                    <span className="min-w-0 flex-1">
                                        <span className={`block truncate text-sm font-medium ${isActive ? 'text-[var(--accent-text)]' : 'text-[var(--text)]'}`}>
                                            {persona.name}
                                        </span>
                                        <span className={`block truncate text-xs ${isActive ? 'text-[var(--accent-text)]/75' : 'text-[var(--muted)]'}`}>
                                            {persona.role}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between px-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--faint)]">Recent chats</p>
                        {!isLoadingChats && chats.length > 0 && (
                            <span className="font-mono text-[10px] text-[var(--faint)]">{chats.length}</span>
                        )}
                    </div>

                    <div className="space-y-1">
                        {isLoadingChats && (
                            <div className="space-y-1.5 px-2 py-1">
                                {[0, 1, 2].map((skeletonIndex) => (
                                    <div
                                        key={skeletonIndex}
                                        className="h-9 animate-pulse rounded-lg bg-[var(--panel)]"
                                        style={{ animationDelay: `${skeletonIndex * 120}ms` }}
                                    />
                                ))}
                            </div>
                        )}

                        {!isLoadingChats && chats.length === 0 && (
                            <p className="px-3 py-2 text-xs text-[var(--faint)]">No chats yet — start one below.</p>
                        )}

                        {!isLoadingChats && chats.map((chat) => {
                            const isActiveChat = chat._id === activeChatId;

                            return (
                                <button
                                    key={chat._id}
                                    type="button"
                                    onClick={() => onSelectChat(chat._id)}
                                    className={`w-full rounded-xl px-3 py-2 text-left transition-colors duration-200 ${
                                        isActiveChat
                                            ? 'bg-[var(--panel)] text-[var(--accent-text)]'
                                            : 'text-[var(--muted)] hover:bg-[var(--panel)]/60 hover:text-[var(--text)]'
                                    }`}
                                >
                                    <p className="truncate text-sm font-medium">{chat.title}</p>
                                    <p className="mt-0.5 font-mono text-[10px] text-[var(--faint)]">
                                        {formatUpdatedAt(chat.updatedAt)}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-[var(--border)] pt-4">
                <Button onClick={onNewChat} className="w-full bg-[var(--accent)] text-white hover:opacity-90 shadow-none">
                    + New chat
                </Button>

                <div className="flex items-center justify-between px-1">
                    <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-[var(--faint)] transition-colors duration-200 hover:bg-[var(--panel)] hover:text-[var(--text)]"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-[var(--faint)] transition-colors duration-200 hover:bg-red-500/10 hover:text-red-400"
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/login';
                        }}
                    >
                        Log out
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;