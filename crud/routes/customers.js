const express = require('express');
const router = express.Router();
const { boolean } = require('joi');
const { Customer, validate } = require('../models/customer');


router.get('/', async (req, res) =>{
    const customers =await Customer.find();
    res.send(customers);
});

router.get('/:id', async (req, res) =>{
    const customerRead = await Customer.findById(req.params.id);
    if(!customerRead)
     return res.status(400).send('unaqa id yoq');

    res.status(200).send(customerRead);
});

router.post('/', async (req, res)=> {
    const { error } = validate(req.body);
    if(error)
    res.status(404).send(error.message);

    let customerCreate = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    });
    customerCreate = await customerCreate.save();
    
    res.status(201).send(customerCreate);
});

router.put('/:id', async (req, res) =>{
    const {error} = validate(req.body);
    if(error)
     return res.status(400).send(error.message);
    
    let customerUpdate = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name}, { new: true});

    if(!customerUpdate)
    return res.status(404).send('bunday id da mavjud emas');

    res.send(customerUpdate);
});

router.delete('/:id', async (req, res) =>{
    let customerDelete = await Customer.findByIdAndRemove(req.params.id);
    if(!customerDelete)
     return res.status(404).send('bunda id yo`q');

    res.send(customerDelete);
});

module.exports = router;