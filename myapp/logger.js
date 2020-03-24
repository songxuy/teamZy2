const log4js = require('log4js');
log4js.configure({
    appenders:{
        console:{type: 'console'},
        file:{
            type :'file',
            filename: 'myapp.log'
        }
    },
    categories:{
        default: {appenders: ['console','file'],level: 'info'},
        product: {appenders: ['file'], level: 'info'}
    }
});
const logger = log4js.getLogger('default')
logger.log4js = log4js
module.exports = logger