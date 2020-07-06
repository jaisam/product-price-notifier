var cheerio = require('cheerio');
var axios = require('axios');


class Webscrapper {

    constructor() {
    }

    async extractDataFromURL() {
        const response = await axios.get(process.env.AMAZON_URL);
        const $ = cheerio.load(response.data);
        const items = []
        $('.s-include-content-margin.s-border-bottom.s-latency-cf-section').each((index, element) => {
            const itemDetails =  {
                name: $(element).find('span.a-size-medium.a-color-base.a-text-normal').text(),
                image: $(element).find('.s-image').attr('src'),
                link: $(element).find('.a-link-normal.a-text-normal').attr('href'),
                price: $(element).find('span.a-price-whole').text(),
            };
            items.push(itemDetails);
        });
        return items;
    }
}

module.exports = Webscrapper;