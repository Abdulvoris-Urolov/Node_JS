const express = require('express');
const mongoose =require('mongoose');
const app = express();
const dotenv =require('dotenv');

mongoose.connect('mongodb://localhost/sport', { useNewUrlParser: true })
.then(()=>{
    console.log('Mongodb ulandi..');
})
.catch ((error) =>{
    console.log('Mongodb ga ulanishda xato bor', err)
});

app .get('/', (req , res) => {
    res.send('salom bollar');
});

const sportSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now }
});

const Sport = mongoose.model("Sport", sportSchema);

async function createSport(){
    const sport = new Sport({
    name: 'Krasovka'
});

const savedSport = await sport.save();
console.log(savedSport);
}

app.get('/', (req, res)=>{
    const _sport = sport.find( s = );
});

const port = process.env.PORT || 1000

app.listen (port, ()=>{
    console.log (`${port}-port ishlayabdi..`);
});

createSport();