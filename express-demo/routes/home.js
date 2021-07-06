const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'my', greeting: 'assalomu alaykum'});
});

module.exports = router;