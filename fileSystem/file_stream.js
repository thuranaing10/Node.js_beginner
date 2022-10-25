const fs = require('fs');


const rs = fs.createReadStream('./files/lorem.txt', {encodeing: 'utf8'});

const ws = fs.createWriteStream('./files/new-lorem.txt');

// rs.on('data', function (dataChunk) {
//     ws.write(dataChunk);
// })

rs.pipe(ws);