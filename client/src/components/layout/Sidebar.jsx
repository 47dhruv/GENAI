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
        <aside className="flex h-full w-full flex-col border-r border-[var(--border)] bg-[var(--sidebar)] px-5 py-6">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-lg font-bold text-[var(--accent-text)]">
                    AI
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--text)]">
                    Workspace
                </p>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-1">
                <div className="space-y-2">
                    <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faint)]">Personas</p>
                    <div className="space-y-1">
                        {personas.map((persona) => {
                            const isActive = persona.id === activePersonaId;
                            const buttonStyles = isActive
                                ? 'border-l-4 border-[var(--accent)] bg-[var(--accent-soft)]'
                                : 'border-l-4 border-transparent hover:bg-[var(--panel)]';

                            return (
                                <button
                                    key={persona.id}
                                    type="button"
                                    onClick={() => onSelectPersona(persona)}
                                    className={`flex w-full flex-col rounded-xl p-3 text-left transition-colors duration-200 ${buttonStyles}`}
                                >
                                    <h3 className={`text-sm font-semibold ${isActive ? 'text-[var(--accent-text)]' : 'text-[var(--text)]'}`}>{persona.name}</h3>
                                    <p className={`text-xs ${isActive ? 'text-[var(--accent-text)]/80' : 'text-[var(--muted)]'}`}>{persona.role}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between px-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faint)]">Recent chats</p>
                        <span className="text-[10px] uppercase tracking-widest text-[var(--faint)]">
                            {isLoadingChats ? '...' : chats.length}
                        </span>
                    </div>

                    <div className="space-y-1">
                        {chats.length === 0 && !isLoadingChats && (
                            <p className="px-2 text-xs text-[var(--faint)]">No chats yet.</p>
                        )}

                        {chats.map((chat) => {
                            const isActiveChat = chat._id === activeChatId;
                            const chatStyles = isActiveChat
                                ? 'bg-[var(--panel)] text-[var(--accent-text)]'
                                : 'bg-transparent text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--text)]';

                            return (
                                <button
                                    key={chat._id}
                                    type="button"
                                    onClick={() => onSelectChat(chat._id)}
                                    className={`w-full rounded-xl px-3 py-2 text-left transition-colors duration-200 ${chatStyles}`}
                                >
                                    <p className="text-sm font-medium truncate">{chat.title}</p>
                                    <p className="mt-0.5 text-xs text-[var(--faint)]">
                                        {formatUpdatedAt(chat.updatedAt)}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-[var(--border)] pt-4">
                <Button onClick={onNewChat} className="w-full bg-[var(--accent)] text-white hover:opacity-90 shadow-none">
                    + New Chat
                </Button>
                
                <div className="mt-2 flex items-center gap-2">
                    <button className="flex-1 rounded-xl p-2 text-xs font-medium text-[var(--faint)] transition-colors hover:bg-[var(--panel)] hover:text-[var(--text)]">
                        Settings
                    </button>
                    <button 
                        className="flex-1 rounded-xl p-2 text-xs font-medium text-[var(--faint)] transition-colors hover:bg-[var(--panel)] hover:text-red-500"
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/login';
                        }}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
