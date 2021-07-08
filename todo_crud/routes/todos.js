import express from 'express';
import { createTodo, readTodos, putTodo } from '../controller/todos.js';
const router = express.Router();
router.get('/', readTodos);
router.post('/', createTodo);
router.put('/', putTodo);
export default router;