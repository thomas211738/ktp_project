
import mongoose from 'mongoose';


const userSchema = mongoose.Schema(
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
        strikes: {
            type: Number,
            default: 3,
        },
        PledgeTask: {
            type: String,
            default: "",
        },
        tasks: {
            type: [{
              name: String,
              description: String,
              isCompleted: Boolean,
            }],
            default: [
              { name: '5 am Run', description: 'Run 2 Miles at 5 Am' , isCompleted: false},
              { name: 'Host a Party', description: 'Host a party', isCompleted: false},
            ],
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);