const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practice', { useNewUrlParser: true, useUnifiedTopology: true } )
.then(()=> { console.log("Mongoga ulandi");})
.catch((err) => { console.log("Mongoga ulanmadi", err); })

const Author = mongoose.model('Author', new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
}));

const Book = mongoose.model('Book', new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author'
    }   
}));

async function createAuthor(firstName, lastName, email){
    const author = new Author({
        firstName,
        lastName,
        email
    });

const result = await author.save();
console.log(result);
} 

async function createBook(title, authorId){
    const book = new Book({
        title: title,
        author: authorId
    });

    const result = await book.save();
    console.log(result);
}

async function listBooks(){
    const book = await Book
        .find()
        //.populate('author', 'firstName - _id')
        .select('title author');
    console.log(book);
}

//createAuthor('Abdulvoris', 'Urolov', 'urolovAbdulvoris@gmail.com');

//createBook('NodeJS', '60ed75ccd997ac23d8337bd1');

listBooks();