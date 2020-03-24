const path = require('path');
const fs = require('fs');
async function render(page){
    const viewUrl = path.join(__dirname,'..',`/view/${page}`)
    return new Promise((resolve,reject) => {
        fs.readFile(viewUrl,(err,data) => {
            if(err){
                return reject('<h1>inner error!</h1>')
            }
            return resolve(data)
        })
    })
}
module.exports = render