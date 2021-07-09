import express from 'express';
import { createTodo, readTodos } from '../controller/todos.js';
const router = express.Router();
router.get('/', readTodos);
router.post('/', createTodo);
router.put('/', updateTodo);
router.delete('/', deleteTodo);
export default router;