import { useState } from 'react';

import api from '../services/api';
import { ChatInput, ChatWindow } from '../components/chat';
import { Navbar, Sidebar } from '../components/layout';
import { personas } from '../data/personas';

const initialAssistantMessage = {
    sender: 'assistant',
    text: 'Select a persona and start a new chat.',
};

const mapStoredMessages = (storedMessages = []) =>
    storedMessages.map(({ role, content }) => ({
        sender: role === 'user' ? 'user' : 'assistant',
        text: content,
    }));

/**
 * ============================================================================
 * Home Page
 * ----------------------------------------------------------------------------
 * Purpose:
 * - Serves as the main chat page for the AI Persona Chat application.
 * - Manages persona selection, chat persistence, and conversation state.
 * ============================================================================
 */
const Home = () => {
    const [activePersona, setActivePersona] = useState(personas[0]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([initialAssistantMessage]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSelectPersona = (persona) => {
        setActivePersona(persona);
        setActiveChatId(null);
        setMessages([{ sender: 'assistant', text: `Persona changed to ${persona.name}.` }]);
        setMessage('');
    };

    const handleNewChat = () => {
        setActiveChatId(null);
        setMessages([{ sender: 'assistant', text: `New chat started with ${activePersona.name}.` }]);
        setMessage('');
    };

    const handleSelectChat = async (chatId) => {
        setIsLoading(true);
        try {
            const response = await api.get(`/chats/${chatId}`);
            const chat = response?.data?.data;

            if (chat) {
                setActiveChatId(chat._id);
                // Switch persona selector to match the loaded chat's persona
                const matchingPersona = personas.find((p) => p.name === chat.persona?.name) || activePersona;
                setActivePersona(matchingPersona);
                setMessages(mapStoredMessages(chat.messages));
            }
        } catch (error) {
            console.error('Failed to load chat:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: trimmedMessage },
        ]);
        setMessage('');
        setIsLoading(true);

        try {
            let chatId = activeChatId;

            // Create the chat in the DB on first message of a new conversation
            if (!chatId) {
                const createResponse = await api.post('/chats', { persona: activePersona });
                chatId = createResponse?.data?.data?._id;
                setActiveChatId(chatId);
            }

            const response = await api.post(`/chats/${chatId}/messages`, {
                message: trimmedMessage,
            });

            const assistantText = response?.data?.data?.assistant || 'Sorry, I could not generate a response.';
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'assistant', text: assistantText },
            ]);
        } catch (error) {
            console.error('Chat API error:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: 'assistant',
                    text: 'Sorry, I could not reach the chat service. Please try again.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--text)] overflow-hidden">
            <div className="flex h-screen w-full relative">
                {/* Mobile Backdrop */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-200"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}
                
                {/* Sidebar Container */}
                <div 
                    className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out lg:relative lg:block
                        ${isSidebarOpen ? 'translate-x-0 lg:w-[320px] lg:opacity-100' : '-translate-x-full lg:w-0 lg:opacity-0 overflow-hidden'}`}
                >
                    <div className="w-[320px] h-full flex-shrink-0">
                        <Sidebar
                            personas={personas}
                            activePersona={activePersona}
                            onSelectPersona={handleSelectPersona}
                            onNewChat={handleNewChat}
                            onSelectChat={handleSelectChat}
                            activeChatId={activeChatId}
                        />
                    </div>
                </div>

                {/* Main Content Area */}
                <section className="flex flex-1 flex-col min-w-0 bg-[var(--background)] transition-all duration-300">
                    <Navbar 
                        activePersona={activePersona} 
                        isSidebarOpen={isSidebarOpen}
                        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />

                    <div className="flex flex-1 flex-col overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
                        <ChatWindow messages={messages} />
                        <ChatInput
                            message={message}
                            onChange={setMessage}
                            onSend={handleSend}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Home;