const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    // res.send('Hello World!');
    // res.sendFile('./views/index.html', {  root: __dirname });
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html'));
});

// Route Handlers
router.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempted to load hello.html');
    next();
},(req, res) => {
    res.send('Hello World!');
});


// Changing route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
};

const two = (req, res, next) => {
    console.log('two');
    next();
};

const three = (req, res, next) => {
    console.log('three');
    res.send('Finished');
};

router.get('/chain(.html)?', [one, two, three]);

module.exports = router;
