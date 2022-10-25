const logEvents = require('./logEvents');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { };

//initializes the object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    //emit Event
    myEmitter.emit('log', 'Log Event Emitted');
},2000);