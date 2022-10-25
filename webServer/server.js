const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter { };

//initializes the object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const serverFile = async (filePath, contentType, response) => {
    try{

        const data = await fsPromises.readFile(filePath, 'utf8');
        response.writeHead(200, {'Content-Type': contentType });
        response.end(data);

    }catch(err){

        console.log(err);
        response.statusCode = 500;
        response.end();
    }

}

const server  = http.createServer((req, res) => {

    console.log(req.url, req.method);

    const extension = path.extname(req.url);

    let contentType;

    switch(extension) {

        case '.css':
            contentType = 'text/css';break;
        case '.js':
            contentType = 'text/javascript';break;
        case '.json':
            contentType = 'application/json';break;
        case '.jpg':
            contentType = 'image/jpg';break;
        case '.png':
            contentType = 'image/png';break;
        case '.txt':
            contentType = 'text/plain';break;
        default:
            contentType = 'text/html';


    }


});






//add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//     //emit Event
//     myEmitter.emit('log', 'Log Event Emitted');
// },2000);