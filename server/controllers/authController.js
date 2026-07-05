import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { getQuestionQuota } from '../services/questionQuota.service.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ success: false, message: 'credential is required' });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        let user = await User.findOne({ googleId });

        if (!user) {
            user = await User.create({
                googleId,
                email,
                name,
                avatar: picture,
            });
        } else {
            user.email = email;
            user.name = name;
            user.avatar = picture;
            await user.save();
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            success: true,
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
            },
        });
    } catch (error) {
        console.error('googleLogin error:', error);
        return res.status(401).json({ success: false, message: 'Invalid Google credential' });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('name email avatar');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const quota = await getQuestionQuota(req.userId);

        return res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                },
                quota,
            },
        });
    } catch (error) {
        console.error('getCurrentUser error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
