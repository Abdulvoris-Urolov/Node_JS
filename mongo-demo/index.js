const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParse: true }, {useUnifiledTopology: true })
    .then(() => {
        console.log('MongoDBga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error('MongoDBga ulanish vaqtida xato ro`y berdi...', err);
    });

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Book = mongoose.model("Book", bookSchema);

async function createBook(){
    const book = new Book({
    name: 'JavaScript darslari',
    author: 'Abdulvoris O`rolov',
    tags: [ 'JS', 'dasturlash','Nodejs darslar' ],
    isPublished: true
});

const savedBook = await book.save();
console.log(savedBook);
}

async function getBooks(){
    const pageNumber = 3;
    const pageSize = 10;

    const books = await Book
        // .find({author: /^A/})  //Muallifning ismi A harfi bilan boshlanganlarini topib beradi
        // .find({author: /ov$/i}) //Muallifni ismi oxiri ov bilan tugaganlarini olib beradi
        // .find({author: /.*ham.*/i}) // Muallifning ismida ham so`zi borlarini topib beradi
        .find({author: 'Abdulvoris O`rolov'}) 
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        //.select({name: 1, tags: 1});
        .count();
    console.log(books);
}

getBooks();




