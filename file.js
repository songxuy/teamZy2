/* var fs = require('fs')
fs.readFile('./txt1.txt', function(err, data) {    
    if (err) {         throw err     }    
    fs.appendFile('./txt2.txt', data, 'utf8', function(err, ret) {        
        if (err) {             throw err         }        
        console.log('success')    
        fs.appendFile('./txt2.txt', '\nsongxuyuan', function(err) {

        })    
    })
}) */
let fs = require('fs');
let readstream = fs.createReadStream('./txt1.txt');
let writesteam = fs.createWriteStream('./txt2.txt',{flag: 'a'})
readstream.on('end',() =>  {
    writesteam.write('\nsongxuyuan')
})
readstream.pipe(writesteam)