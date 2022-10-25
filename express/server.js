const { application } = require('express');
const express = require('express');
const { request } = require('http');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const {corsOptions} = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

// custom middleware loggers
app.use(logger);

// Cross Origin Resource Sharig

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words : form-data
// 'content-type : application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/',express.static(path.join(__dirname, '/public')));
app.use('/subdir',express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/api/employees'))

// // Route Handlers
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('Attempted to load hello.html');
//     next();
// },(req, res) => {
//     res.send('Hello World!');
// });


// // Changing route handlers
// const one = (req, res, next) => {
//     console.log('one');
//     next();
// };

// const two = (req, res, next) => {
//     console.log('two');
//     next();
// };

// const three = (req, res, next) => {
//     console.log('three');
//     res.send('Finished');
// };

// app.get('/chain(.html)?', [one, two, three]);

app.all('/*', (req, res) => {
    res.status(404);

    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views','404.html'))
    } else if(req.accepts('json')){
        res.json({ error: "404 Not Found" });
    }else{
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});