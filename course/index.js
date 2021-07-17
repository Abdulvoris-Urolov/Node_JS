const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/course', { useNewUrlParser: true, useUnifiedTopology: true })
    .then( ( ) => {
        console.log('mongoga ulandi');
    })
    .catch((err) =>{
        console.error('mongoga ulanishda xato');
    })

app.get('/', (req, res) =>{
    res.send('1100-port ishlayabdi');
});

app.listen(1100, ()=>{
    console.log('1100 port iwladi');
});