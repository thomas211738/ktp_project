
import mongoose from 'mongoose';

const adminSchema = mongoose.Schema(
    {
        email: {
        type: String,
        required: true,
        },
        firstName: {
        type: String,
        required: true,
        },
        lastName: {
        type: String,
        required: true,
        },

    },
    {
        timestamps: true,
    }
);

export const Admin = mongoose.model('Admin', adminSchema);