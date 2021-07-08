import mongoose from 'mongoose';
import Todo from '../models/todo.js';

export const readTodos = async  (req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    }
    catch(eror){
        res.status(404).json({error: error.message})

    }
}

export const createTodo = async  (req, res) => {
    const todo =new Todo(req.body);
    try{
        await todo.save();
        res.status(201).json(todo);
    }
    catch(eror){
        res.status(409).json({error: error.message})

    }
}
export const putTodo = async  (req, res) => {
    const todo =new Todo(req.body);
    try{
        await todo.save();
        res.status(201).json(todo);
    }
    catch(eror){
        res.status(409).json({error: error.message})

    }
}