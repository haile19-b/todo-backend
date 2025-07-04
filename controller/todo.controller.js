import Todo from "../models/todo.model.js";

export const addTodo = async (req, res) => {
    const { title, description, difficulty = 'Medium' } = req.body; // Difficulty defaults to 'Medium'
    
    if (!title) { // Only title is required now
        return res.status(400).json({ 
            message: "Title is required",
            success: false
        });
    }

    try {
        const userId = req.auth.userId || req.auth.sub;
        
        const newTodo = await Todo.create({
            title,
            description: description || 'No-description',
            difficulty:difficulty || "medium", 
            userId
        });

        return res.status(201).json({ 
            message: "Todo added successfully", 
            todo: newTodo,
            success: true
        });

    } catch (error) {
        return res.status(500).json({ 
            error: error.message,
            success: false
        });
    }
};

// ✅ Get User Todos (Fixed issues)
export const fetchTodo = async (req, res) => {
    try {
        const userId = req.auth.userId || req.auth.sub;
        const todos = await Todo.find({ userId });

        if (todos.length === 0) { // Check for empty array instead of null
            return res.status(200).json({ 
                message: "No todos found for this user",
                todos: [] ,
                userId,
                success:false
            });
        }

        return res.status(200).json({ // Changed to 200 (success)
            todos,
            success: true,
            userId:userId
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Failed to fetch todos",
            error: error.message, // Include error details
            success:false
        });
    }
};

// ➕ ADDED: Update Todo
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, difficulty } = req.body;
    const userId = req.auth.userId || req.auth.sub;

    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, userId }, // Ensure todo belongs to user
            { title, description, difficulty },
            { new: true } // Return updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ 
                message: "Todo not found or not owned by user" ,
                success:false
            });
        }

        return res.status(200).json({
            message: "Todo updated successfully",
            todo: updatedTodo,
            success:true
        });

    } catch (error) {
        return res.status(500).json({ 
            error: error.message,
            success:false
        });
    }
};

// ➕ ADDED: Delete Todo
export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.auth.userId || req.auth.sub;

    try {
        const deletedTodo = await Todo.findOneAndDelete({ 
            _id: id, 
            userId 
        });

        if (!deletedTodo) {
            return res.status(404).json({ 
                message: "Todo not found or not owned by user",
                success:false
            });
        }

        return res.status(200).json({
            message: "Todo deleted successfully",
            todo: deletedTodo,
            success:true
        });

    } catch (error) {
        return res.status(500).json({ 
            error: error.message,
            success:false
        });
    }
};