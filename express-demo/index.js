const { request } = require('express')
const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Salom');
});

const books = [
    { id: 1, name: 'rich dad poor dad' },
    { id: 2, name: 'good to great' },
    { id: 3, name: 'rework' }
];

app.get('/api/books', (req,res) => {
    res.send(books);
});

app.post('/api/books', (req, res) => {

    const bookSchema = {
        name: Joi.string().required().min(4)
    };

    const result = Joi.validate(req.body, bookSchema);
    if (result.error){
        return res.status(400).send(result.error.details[0].message);
    }
   // console.log(`req --- ${result.body}`)

    const { error }=validateBook(req.body);
    error(   
         res.status(400).send(error.details[0].message)
    )

    const book = {
        id: books.leght + 1,
        name: req.body.name
    };
    books.push(book);
    res.status(201).send(book);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book)
    return res.status(404).send('Berilgan ID ga teng bo\`lgan kitob topilmadi');
        res.send(book);
});

app.put('/api/books/:id', (req, res) => {
    //Kitobni bazadan izlab topish
    //Agar kitob mavjud bo'lmasa, 404 qaytaradi
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book)
        return res.status(404).send('Berilgan ID ga teng bo\`lgan kitob topilmadi');
    //Agarda kitob topilsa, so'rovni validatsiya qilish
    //Agarda so'rov validatsiyadan o'tmasa, 400 qaytaradi
    const { error }=validateBook(req.body);
    error(   
        res.status(400).send(error.details[0].message)
    )
    //Kitobni yangilash 
    book.name = req.body.name;
    //Yangilangan kitobni qaytarish
    res.send(book);
});

app.delete('/api/books/:id', (req, res) =>{
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

function validateBook(book) {
    const bookSchema = Joi.object({
        name: Joi.string()
                 .required()
                 .min(3)
    });
    
    return bookSchema.validate(book, bookSchema);
}

// app.get('api/articles/:year/:month', (req, res) => {
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`${port} chi portni eshitishni boshladim`);
});