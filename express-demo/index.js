const { request } = require('express');
const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Logger ishlayabdi...');
}

app.use(logger.nameAuth);
app.use(helmet());
console.log(config.get('name'));
console.log(config.get('mailserver.host'));
console.log(config.get('mailserver.password'));
//console.log(process.env.NODE_ENV);
//console.log(app.get('env'));

const books = [
    { id: 1, name: 'rich dad poor dad' },
    { id: 2, name: 'good to great' },
    { id: 3, name: 'rework' }
];

app.get('/', (req, res) => {
    res.send('Salom');
});

app.get('/api/books', (req,res) => {
    res.send(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book)
    return res.status(404).send('Berilgan ID ga teng bo\`lgan kitob topilmadi');
        res.send(book);
});

app.post('/api/books', (req, res) => {

    let { error } = validateBook(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.status(201).send(book);
});

app.put('/api/books/:id', (req, res) => {
    //Kitobni bazadan izlab topish
    //Agar kitob mavjud bo'lmasa, 404 qaytaradi
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book)
        return res.status(404).send('Berilgan ID ga teng bo\`lgan kitob topilmadi');
    //Agarda kitob topilsa, so'rovni validatsiya qilish
    //Agarda so'rov validatsiyadan o'tmasa, 400 qaytaradi
    const { error } = validateBook(req.body);
    if(error){   
        res.status(400).send(error.details[0].message)
}
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
    
    return bookSchema.validate(book);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`${port} chi portni eshitishni boshladim`);
});