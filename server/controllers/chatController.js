import { isValidObjectId } from 'mongoose';
import Chat from '../models/chat.model.js';
import { generateAssistantResponse } from '../services/geminiapi.service.js';
import {
    getQuestionQuota,
    refundQuestionQuota,
    reserveQuestionQuota,
} from '../services/questionQuota.service.js';

// POST /api/chat — original stateless single-message endpoint (no persistence)
export const postChat = async (req, res) => {
    try {
        const { message, persona, history } = req.body;

        if (!message || !persona || !persona.name || !persona.role || !history) {
            return res.status(400).json({
                success: false,
                message: 'message ,history and persona are required',
            });
        }

        const assistantText = await generateAssistantResponse({ message, persona, history });

        return res.json({
            success: true,
            data: {
                assistant: assistantText,
            },
        });
    } catch (error) {
        console.error('Chat controller error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

// POST /api/chats — create a new chat session
export const createChat = async (req, res) => {
    try {
        const { persona } = req.body;

        if (!persona || !persona.name) {
            return res.status(400).json({ success: false, message: 'persona is required' });
        }

        const quota = await getQuestionQuota(req.userId);

        if (quota.remaining <= 0) {
            return res.status(429).json({
                success: false,
                message: 'Daily question limit reached',
                data: { quota },
            });
        }

        const chat = await Chat.create({
            userId: req.userId,
            persona,
            title: `Chat with ${persona.name}`,
            messages: [],
        });

        return res.status(201).json({ success: true, data: chat });
    } catch (error) {
        console.error('createChat error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const listChats = async (req, res) => {
    try {
        const chats = await Chat.find({ userId: req.userId })
            .select('_id title persona updatedAt')
            .sort({ updatedAt: -1 });

        return res.json({ success: true, data: chats });
    } catch (error) {
        console.error('listChats error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getChat = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid chat id' });
        }

        const chat = await Chat.findOne({ _id: id, userId: req.userId });

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }

        return res.json({ success: true, data: chat });
    } catch (error) {
        console.error('getChat error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const postMessageToChat = async (req, res) => {
    let quotaReserved = false;

    try {
        const { id } = req.params;
        const { message } = req.body;

        if (!isValidObjectId(id)) {
            return res.status(400).json({ success: false, message: 'Invalid chat id' });
        }

        if (!message) {
            return res.status(400).json({ success: false, message: 'message is required' });
        }

        const chat = await Chat.findOne({ _id: id, userId: req.userId });

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }

        const reservation = await reserveQuestionQuota(req.userId);
        quotaReserved = reservation.allowed;

        if (!reservation.allowed) {
            return res.status(429).json({
                success: false,
                message: 'Daily question limit reached',
                data: { quota: reservation.quota },
            });
        }

        const history = chat.messages.map(({ role, content }) => ({ role, content }));

        const assistantText = await generateAssistantResponse({
            message,
            persona: chat.persona,
            history,
        });

        chat.messages.push({ role: 'user', content: message });
        chat.messages.push({ role: 'assistant', content: assistantText });
        await chat.save();

        return res.json({
            success: true,
            data: {
                assistant: assistantText,
                chat,
                quota: reservation.quota,
            },
        });
    } catch (error) {
        if (quotaReserved) {
            try {
                await refundQuestionQuota(req.userId);
            } catch (refundError) {
                console.error('refundQuestionQuota error:', refundError);
            }
        }

        console.error('postMessageToChat error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
