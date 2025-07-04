import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    difficulty: {
        type: String,
        required: [true, "Difficulty is required"],
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    userId: {
        type: String,
        required: true, // Every todo must belong to a user
        index: true // Improves query performance for user-specific searches
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('todo',todoSchema)

export default Todo;