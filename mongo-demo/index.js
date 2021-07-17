//mongoose ni yuklab olish
const mongoose = require('mongoose');
//mongodb ga ulanish
mongoose.connect('mongodb://localhost/test', {useNewUrlParse: true }, {useUnifiledTopology: true })
    .then(() => {
        console.log('MongoDBga ulanish hosil qilindi...');
    })
    .catch((err) => {
        console.error('MongoDBga ulanish vaqtida xato ro`y berdi...', err);
    });
//Sxema tuzib olish yani siz kiritayotgan kirob nimalarga asoslanib yozilib kiritilishi kerakligi
const bookSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 100
    },
    author: String,
    tags: {
        type: Array,
        validate:{
            isAsync: true,
            validator: function(val, callback) {
                setTimeout(() => {
                    const result =  val && val.length > 0;
                    callback(result);
                }, 10);
            },
            message: 'Kitobning eng kamida bitta tegi bo`lishi kerak'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function()    {
            return this.isPublished;
        },
        min: 3,
        max: 100,
        get: val => Math.round(val),
        set: val => Math.round(val)
    },
    category: {
        type: String,
        required: true,
        enum: ['classic', 'biology', 'science'],
        lowercase: true,
        trim: true
    }
});
const Book = mongoose.model("Book", bookSchema);
//CREATE
async function createBook(){
    const book = new Book({
    name: 'JavaScript darslari',
    author: 'Abdulvoris O`rolov',
    tags:[ 'JS', 'dasturlash','Nodejs darslar' ],
    isPublished: true,
    price: 50.8,
    category: 'classic'
});
    try{
    const savedBook = await book.save();
    console.log(savedBook);
    }catch(ex){
        console.log(ex);
    }
}
//READ
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
//UPDATE
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
//DELETE
async function deletedBook(id){
    const result = await Book.deleteOne({ _id: id });
    console.log(result);
}

createBook();




