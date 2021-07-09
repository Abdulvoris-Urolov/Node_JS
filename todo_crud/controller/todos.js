//import mongoose from 'mongoose';
import Todo from '../models/todo.js';
//get request
export const readTodos = async  (req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    }
    catch(eror){
        res.status(404).json({error: error.message})

    }
}
//post request
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
//put request
export const updateTodo =async (req, res) => {
    if(!req.body){
        return res.satatus(400).send({ message: "update"})
    }
}
//delete request
export const deleteTodo = async (req, res) =>{

}
router.delete('/:id', (req, res) =>{
    //kitobni idsi bo`yicha izlaymiz
    //agar topilmasa 404 qaytaramiz
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book)
        return res.status(404).send('Berilgan ID ga teng bo\`lgan kitob topilmadi');
    //topilsa uni o`chirib tashlaymiz
    const bookIndex =books.indexOf(book);
    books.splice(bookIndex, 1);
    //topilgan kitobni qaytarib beramiz
    res.send(book);
});