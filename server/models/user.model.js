import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        googleId: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        name: { type: String },
        avatar: { type: String },
        dailyQuestionCount: { type: Number, default: 0 },
        dailyQuestionDate: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
