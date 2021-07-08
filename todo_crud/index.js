import express from 'express';
const app = express();
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import todosRoutes from './routes/todos.js';
//import cors from 'cors';

dotenv.config();

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use('/todos', todosRoutes);
//app.use(cors());


mongoose.connect('mongodb://localhost/todoCrud', {useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDBga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error('MongoDBga ulanish vaqtida xato ro`y berdi...', err);
    });

app.get('/', (req, res) => {
    res.send('salom')
})

const port = process.env.PORT || 1000;
app.listen(port, () => {
    console.log(`${port}-port ishlayabdi`);
});