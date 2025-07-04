import express from 'express';

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { addTodo, deleteTodo, fetchTodo, updateTodo } from '../controller/todo.controller.js';

const todosRouter = express.Router();

todosRouter.post('/', ClerkExpressRequireAuth(), addTodo);
todosRouter.get('/', ClerkExpressRequireAuth(), fetchTodo);
todosRouter.put('/:id', ClerkExpressRequireAuth(), updateTodo);
todosRouter.delete('/:id', ClerkExpressRequireAuth(), deleteTodo);

export default todosRouter;