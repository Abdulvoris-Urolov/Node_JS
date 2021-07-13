const express = require('express');
const router = express.Router();
const { Category, validate } = require('../models/category');

router.get('/', async (req, res) =>{
    const categories =await Category.find();
    res.send(categories);
});

router.get('/:id', async (req, res) =>{
    const categoryRead = await Category.findById(req.params.id);
    if(!categoryRead)
     return res.status(400).send('unaqa id yoq');

    res.status(200).send(categoryRead);
});

router.post('/', async (req, res)=> {
    const { error } = validate(req.body);
    if(error)
    res.status(404).send(error.message);

    let categoryCreate = new Category({
        name: req.body.name
    });
    categoryCreate = await categoryCreate.save();
    
    res.status(201).send(categoryCreate);
});

router.put('/:id', async (req, res) =>{
    const {error} = validate(req.body);
    if(error)
     return res.status(400).send(error.message);
    
    let categoryUpdate = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name}, { new: true});

    if(!categoryUpdate)
    return res.status(404).send('bunday id da mavjud emas');

    res.send(categoryUpdate);
});

router.delete('/:id', async (req, res) =>{
    let categoryDelete = await Category.findByIdAndRemove(req.params.id);
    if(!categoryDelete)
     return res.status(404).send('bunda id yo`q');

    res.send(categoryDelete);
});

module.exports = router;