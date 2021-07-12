const express = require('express');
const app = express();
const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/sport',  { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => {
        console.log('Mongoga ulanish hosil bo\'ldi.');
    })
    .catch((err)=>{
        console.error('Mongoga ulanish vaqtida xato yuz berdi.', err);
    });

const sportSchema = new mongoose.Schema({
    name: String,
    size: Number,
    date:{ type: Date, default: Date.now }
});

const Sport = mongoose.model("Sport", sportSchema);
//CREATE
async function createSport(){
    const sport = new Sport({
        name: 'savat',
        size: 46
    });
    const savedSport = await sport.save();
    console.log(savedSport);
}

async function readSport(){
    const sports = await Sport.find();
    console.log(sports);
}

async function updateSport(id){
    const sport = await Sport.findById(id)
    if(!sport)
    return;

    sport.name = 'Savat';
    sport.size = 48;

    const updatedSport = await sport.save();
    console.log(updatedSport);
}

async function deleteSport(id){
    const result =await Sport.deleteOne({_id: id});
    console.log(result);
}
// deleteSport('60e94054596ca323bcd1b12e');

app.listen(1000, () =>{
    console.log('1000-port ishlayabdi');
});