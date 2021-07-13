const express = require('express');
const app = express();
const Joi = require('joi');

const category =[
    { id: 1, name: '1-dars' },
    { id: 2, name: '2-dars' },
    { id: 3, name: '3-dars' }
];

app.get('/api/category', (req, res) =>{
    res.send(category);
});

app.get('/api/category/:id', (req, res) =>{
    const video = category.find(v => v.id === parseInt(req.params.id));
    if(!video)
    return res.status(404).send('Siz bergan id bo`yicha video darsimiz yo`q');
        res.send(video);    
});

app.post('/api/category', (req, res) =>{

    const categorySchema = {
        name: Joi.string()
                 .required()
                 .min(5)
    };
    const {error} = Joi.validate(req.body, categorySchema);
    if(error)
        return res.status(404).send(error.message);

    // const (error) =validateCategory()

});

app.put('/api/category/:id', (req, res) =>{
    const video = category.find(v => v.id === parseId(req.params.id));
    if(!video)
    return res.status(404).send('Siz bergan id bo`yicha video darsimiz yo`q');

    const { error }=validateCategory(req.body);
    error(   
        res.status(400).send(error.details[0].message)
         )

    video.name = req.body.name;
    res.send(book);
});

app.delete('/api/category/:id', (req, res) => {
    const video = category.find(v => v.id === parseId(req.params.id));
    if(!video)
    return res.status(404).send('Siz bergan id bo`yicha video darsimiz yo`q');
 
    const categoryIndex =category.indexOf(video);
    category.splice(categoryIndex, 1);
    res.send(video);
});

function validateCategory(video) {
    const categorySchema = Joi.object({
        name: Joi.string()
                 .required()
                 .min(3)
    });
    
    return categorySchema.validate(video, categorySchema);
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`${port} chi portni eshitishni boshladim`);
});