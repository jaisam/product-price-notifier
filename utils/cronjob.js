var cron = require('node-cron');
var Webscrapper = require('./webscrapper');
var Email = require('./email');

class Cronjob {
    constructor() {
    }

    async jobScheduler(){
        cron.schedule("* 9 * * *", async () => {
           const items = await new Webscrapper().extractDataFromURL();
           console.log('items[0]', items[0]);
            await new Email(items[0]).sendProductPriceNotifierMail();
        });
    }
}

module.exports = Cronjob;