import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { personas } from '../data/personas';
import api from '../services/api';

const personaDetails = {
    hitesh: {
        name: 'Hitesh Choudhary',
        specialty: 'Backend / JavaScript / Open source',
        description:
            'Weekly videos on programming fundamentals, new frameworks, and open-source tooling, with broad interest across JS, Python, PHP, and ML.',
        youtube: 'https://www.youtube.com/@hiteshchoudharydotcom',
        github: 'https://github.com/hiteshchoudhary',
        website: 'https://hiteshchoudhary.com',
        image: 'https://avatars.githubusercontent.com/u/11613311?v=4',
        accent: '#C98A3D',
        accentSoft: 'rgba(201,138,61,0.14)',
        session: 'hitesh.session',
    },
    piyush: {
        name: 'Piyush Garg',
        specialty: 'Full-stack / GenAI / System design',
        description:
            'Software engineer turned educator, covering coding and tech from first principles through advanced, real-world system design.',
        youtube: 'https://www.youtube.com/@piyushgargdev',
        github: 'https://github.com/piyushgarg-dev',
        website: 'https://piyushgarg.dev',
        image: 'https://avatars.githubusercontent.com/u/44976328?v=4',
        accent: '#6FA88F',
        accentSoft: 'rgba(111,168,143,0.14)',
        session: 'piyush.session',
    },
};

const terminalLines = [
    { prompt: true, text: 'parsona connect' },
    { text: 'loading mentors...' },
    { text: 'hitesh.chat   - chai aur code, backend, JS fundamentals' },
    { text: 'piyush.chat   - full-stack, GenAI, system design' },
];

const getChatPath = (personaId) => (
    localStorage.getItem('token') ? `/chat/${personaId}` : `/login/${personaId}`
);

const Landing = () => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    const [quota, setQuota] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) return undefined;

        let isMounted = true;

        const fetchQuota = async () => {
            try {
                const response = await api.get('/auth/me');
                const currentQuota = response?.data?.data?.quota;

                if (isMounted && currentQuota) {
                    setQuota(currentQuota);
                }
            } catch (error) {
                console.error('Failed to load landing quota:', error);
            }
        };

        fetchQuota();

        return () => {
            isMounted = false;
        };
    }, [isLoggedIn]);

    return (
    <main className="h-screen overflow-y-auto bg-[#0E0D0B] px-4 py-8 text-[#F3EDE3] sm:px-6 lg:px-10">
        <style>{`
            @keyframes psn-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
            .psn-cursor { animation: psn-blink 1s step-end infinite; }
            @media (prefers-reduced-motion: reduce) {
                .psn-cursor { animation: none; opacity: 1; }
            }
        `}</style>

        <div className="mx-auto flex min-h-full max-w-6xl flex-col gap-6">
            <nav className="flex shrink-0 items-center justify-between rounded-2xl border border-white/[0.06] bg-[#141210] px-5 py-4">
                <Link to="/" className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#F3EDE3]">
                    AI Persona Chat
                </Link>

                {isLoggedIn && (
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs">
                        <span className="hidden text-white/45 sm:inline">Questions left</span>
                        <span className="font-semibold text-[#F3EDE3]">
                            {typeof quota?.remaining === 'number' ? `${quota.remaining}/${quota.limit ?? 40}` : '--/40'}
                        </span>
                    </div>
                )}
            </nav>

            <section className="grid shrink-0 gap-8 rounded-[28px] border border-white/[0.06] bg-[#141210] p-7 lg:grid-cols-[1.3fr_1fr] lg:p-9">
                <div className="flex flex-col justify-center gap-5">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[#A79C8C]">
                        ~/persona
                    </span>
                    <h1
                        className="max-w-xl text-4xl leading-[1.1] text-[#F3EDE3] sm:text-5xl"
                        style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500 }}
                    >
                        Two mentors. Zero waiting for office hours.
                    </h1>
                    <p className="max-w-md text-base leading-7 text-white/60">
                        Chat with AI personas trained on Hitesh&apos;s and Piyush&apos;s teaching style. Ask your doubt the way you would ask it live, whenever you are stuck.
                    </p>
                    {!isLoggedIn ? (
                        <div className="flex flex-wrap gap-3 pt-1">
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center rounded-xl bg-[#F3EDE3] px-5 py-2.5 text-sm font-semibold text-[#0E0D0B] transition hover:bg-white"
                            >
                                Login
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3 pt-1">
                            <Link
                                to="/chat"
                                className="inline-flex items-center justify-center rounded-xl bg-[#F3EDE3] px-5 py-2.5 text-sm font-semibold text-[#0E0D0B] transition hover:bg-white"
                            >
                                Go to Chat
                            </Link>
                        </div>
                    )}
                </div>

                <div className="hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0908] lg:block">
                    <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="ml-3 font-mono text-[11px] text-white/35">session - zsh</span>
                    </div>
                    <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
                        {terminalLines.map((line, index) => (
                            <p key={index} className={line.prompt ? 'text-[#F3EDE3]' : 'text-white/50'}>
                                {line.prompt && <span className="text-[#C98A3D]">$ </span>}
                                {line.text}
                            </p>
                        ))}
                        <p className="text-[#F3EDE3]">
                            <span className="text-[#C98A3D]">$ </span>
                            <span className="psn-cursor">|</span>
                        </p>
                    </div>
                </div>
            </section>

            <section id="personas" className="grid flex-1 gap-6 lg:grid-cols-2">
                {personas.map((persona) => {
                    const details = personaDetails[persona.id];
                    return (
                        <article
                            key={persona.id}
                            className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#141210] transition hover:border-white/[0.14]"
                        >
                            <div
                                className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3"
                                style={{ background: details.accentSoft }}
                            >
                                <span className="h-2 w-2 rounded-full" style={{ background: details.accent }} />
                                <span className="font-mono text-[11px] text-white/50">{details.session}</span>
                            </div>

                            <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={details.image}
                                            alt={details.name}
                                            className="h-14 w-14 rounded-full object-cover"
                                            style={{ boxShadow: `0 0 0 2px ${details.accent}` }}
                                        />
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#F3EDE3]">{details.name}</h3>
                                            <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: details.accent }}>
                                                {details.specialty}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm leading-6 text-white/60">{details.description}</p>

                                    <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-white/35">
                                        <a href={details.youtube} target="_blank" rel="noreferrer" className="transition hover:text-white/70">
                                            youtube
                                        </a>
                                        <a href={details.github} target="_blank" rel="noreferrer" className="transition hover:text-white/70">
                                            github
                                        </a>
                                        <a href={details.website} target="_blank" rel="noreferrer" className="transition hover:text-white/70">
                                            website
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        to={getChatPath(persona.id)}
                                        className="inline-flex flex-1 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-[#0E0D0B] transition"
                                        style={{ background: details.accent }}
                                    >
                                        Start chat
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>
        </div>
    </main>
    );
};

export default Landing;
