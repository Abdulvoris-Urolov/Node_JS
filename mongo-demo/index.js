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
});w

const savedBook = await book.save();
console.log(savedBook);
}

async function getBooks(){
    const pageNumber = 3;
    const pageSize = 10;

    const books = await Book
        .find({author: 'Abdulvoris O`rolov'}) 
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(books);
}

async function updateBook(id){
    const book = await Book.findById(id);
    if(!book)
    return;

    book.isPublished = true;
    book.name = "NodeJS";
    book.author = "Abdulvoris";

   const updatedBook = await book.save();
    console.log(updatedBook);
}

// async function updateBook2(id){
//     const result = await Book.update({_id: id}, {
//         $set:{
//             author: "Urolov",
//             isPublished: false
//         }
//     });

//     console.log(result);
// }

async function deletedBook(id){
    const result = await Book.deleteOne({ _id: id });
    console.log(result);
}

deletedBook('60e407a8966e832b542a6d2b');




