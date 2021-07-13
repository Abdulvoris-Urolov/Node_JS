const express = require('express');
const app = express();
const mongoose = require('mongoose');
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');

mongoose.connect('mongodb://localhost/home', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() =>{
        console.log('mongo iwlayabdi');
    })
    .catch((err) =>{
        console.error('mongo iwlamayabdi', err);
    })

app.use(express.json());
app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute);

app.get('/', (req, res) =>{
    res.send('salom');
});

app.listen(1000, ()=>{
    console.log('1000-port ishlayabdi');
});