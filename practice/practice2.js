const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/practice2', { useNewUrlParser: true, useUnifiedTopology: true } )
.then(()=> { console.log("Mongoga ulandi");})
.catch((err) => { console.log("Mongoga ulanmadi", err); })

const authorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});

const bookSchema = new mongoose.Schema({
    title: String,
    authors: {
        type: [authorSchema],
        required: true
    }
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Author'
    // }   
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

async function createAuthor(firstName, lastName, email){
    const author = new Author({
        firstName,
        lastName,
        email
    });

const result = await author.save();
console.log(result);
} 

async function createBook(title, authors){
    const book = new Book({
        title: title,
        authors: authors
    });

    const result = await book.save();
    console.log(result);
}

async function listBooks(){
    const book = await Book
        .find()
        .populate('author', 'firstName -_id')
        .select('title author');
    console.log(book);
}

createBook('Abdulvoris', [
            new Author({
                firstName: 'Abdulvoris',
                lastName: 'DarkWeb',
                email: 'urolov@gmail.com' 
            }),
            new Author({
                firstName: 'asasasas',
                lastName: 'dvsd',
                email: 'ufdbvdfbvdfbdfrolov@gmail.com' 
            })
        ]
            );

// async function updateAuthor(bookId){
//     await Book.updateOne({ _id: bookId},{
//         $unset: {
//             'author': ''
//         }
//     });
// }

// updateAuthor('60eedc98867b7a39e89ab83f');