import User from '../models/user.model.js';

export const DAILY_QUESTION_LIMIT = 40;

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const getNextResetAt = () => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
};

const formatQuota = (used = 0) => ({
    limit: DAILY_QUESTION_LIMIT,
    used,
    remaining: Math.max(DAILY_QUESTION_LIMIT - used, 0),
    resetAt: getNextResetAt().toISOString(),
});

export const getQuestionQuota = async (userId) => {
    const today = getTodayKey();

    await User.updateOne(
        {
            _id: userId,
            $or: [
                { dailyQuestionDate: { $ne: today } },
                { dailyQuestionDate: { $exists: false } },
            ],
        },
        {
            $set: {
                dailyQuestionDate: today,
                dailyQuestionCount: 0,
            },
        }
    );

    const user = await User.findById(userId).select('dailyQuestionCount');
    return formatQuota(user?.dailyQuestionCount || 0);
};

export const reserveQuestionQuota = async (userId) => {
    const today = getTodayKey();

    await getQuestionQuota(userId);

    const user = await User.findOneAndUpdate(
        {
            _id: userId,
            dailyQuestionDate: today,
            dailyQuestionCount: { $lt: DAILY_QUESTION_LIMIT },
        },
        { $inc: { dailyQuestionCount: 1 } },
        { new: true, select: 'dailyQuestionCount' }
    );

    if (!user) {
        return {
            allowed: false,
            quota: await getQuestionQuota(userId),
        };
    }

    return {
        allowed: true,
        quota: formatQuota(user.dailyQuestionCount),
    };
};

export const refundQuestionQuota = async (userId) => {
    const today = getTodayKey();

    await User.updateOne(
        {
            _id: userId,
            dailyQuestionDate: today,
            dailyQuestionCount: { $gt: 0 },
        },
        { $inc: { dailyQuestionCount: -1 } }
    );

    return getQuestionQuota(userId);
};
