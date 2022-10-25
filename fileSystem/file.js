const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname,'files','starter.txt'), 'utf-8');
        console.log(data);

        await fsPromises.unlink(path.join(__dirname,'files','starter.txt'));
        await fsPromises.writeFile(path.join(__dirname,'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname,'files', 'promiseWrite.txt'), "\nNice to meet you...");
        await fsPromises.rename(path.join(__dirname,'files', 'promiseWrite.txt'), path.join(__dirname,'files', 'promiseComplete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname,'files', 'promiseComplete.txt'), 'utf-8');
        console.log(newData);

    }catch(err) {
        console.log(err);
    };
}

fileOps();


// fs.readFile('./files/starter.txt', 'utf-8', function(err, data) {
//     if(err) throw err;
    
//     console.log(data);

// });

// console.log('Hello...');

// fs.writeFile(path.join(__dirname, 'files','reply.txt'), 'Nice to meet you!', function(err, data) {
//     if(err) throw err;
//     console.log("Write Completed");

//     fs.appendFile(path.join(__dirname, 'files','reply.txt'),'\n \nYes, It is.',function(err, data) {
//         if(err) throw err;
//         console.log('Append completed successfully');

//         fs.rename(path.join(__dirname, 'files','reply.txt'),path.join(__dirname, 'files','newReply.txt'),function(err, data){
//             console.log("Renamed Completed");
//         })
//     })
// });

// process.on('uncaughtException', function(err) {
//     console.error(err);
//     process.exit(1);
// })