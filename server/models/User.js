const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },

    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

module.exports.User = mongoose.model('User', UserSchema);