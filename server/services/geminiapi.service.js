import OpenAI from 'openai';
import { hiteshSystemPrompt } from '../personas/hitesh.js';
import { piyushSystemPrompt } from '../personas/piyush.js';

const apiKey = process.env.GEMINI_API_KEY
const baseURL = process.env.BASE_URL;

const openaiClient = apiKey ? new OpenAI({ apiKey, baseURL }) : null;

const getSystemPrompt = (personaName) => {
    const normalizedPersonaName = (personaName || '').toLowerCase();

    if (normalizedPersonaName === 'hitesh' || normalizedPersonaName === 'hitesh choudhary') return hiteshSystemPrompt;
    if (normalizedPersonaName === 'piyush' || normalizedPersonaName === 'piyush garg') return piyushSystemPrompt;
    throw new Error('Unknown persona: ' + personaName);
};

export const generateAssistantResponse = async ({ message, persona, history }) => {
    if (!message || !persona) {
        throw new Error('Missing message or persona.');
    }

    if (!openaiClient) {
        console.warn('GEMINI_API_KEY is not set. Returning fallback response.');
        return `This is a placeholder response from ${persona.name}.`;
    }

    const systemPrompt = getSystemPrompt(persona.name);

    const response = await openaiClient.chat.completions.create({
        model: 'gemini-3.5-flash',
        messages: [
            { role: 'system', content: systemPrompt },
            ...(history || []),
            { role: 'user', content: message },
        ],
        temperature: 0.9,

    });

    return response?.choices?.[0]?.message?.content?.trim() || `I could not generate a response.`;
};