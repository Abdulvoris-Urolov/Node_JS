const express = require('express');
const Joi = require('joi');
const router = express.Router();

const books = [
    { id: 1, name: 'rich dad poor dad' },
    { id: 2, name: 'good to great' },
    { id: 3, name: 'rework' }
];

router.get('/', (req,res) => {
    res.send(books);
});
//read
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book)
    return res.status(404).send('Berilgan ID ga teng bo\`lgan kitob topilmadi');
        res.send(book);
});
//create
router.post('/', (req, res) => {

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
//update
router.put('/:id', (req, res) => {
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
//delete    
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

function validateBook(book) {
    const bookSchema = Joi.object({
        name: Joi.string()
                 .required()
                 .min(3)
    });
    
    return bookSchema.validate(book);
}

module.exports = router;