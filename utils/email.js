const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');


class Email {
    constructor(item) {
        this.username = 'Jai';
        this.name = item.name;
        this.image = item.image;
        this.link = item.link;
        this.price = item.price;
    }

    myTransport() {
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    }

    async send(subject, template) {
        const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`, // location of pug file
            { 
                name: this.name,
                link: this.link,
                image: this.image,
                price: this.price
                // subject
            });
        let transporter = this.myTransport();

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'jaisamtani123@gmail.com',
            subject,
            html,
            // html: '<b>A Message from Node Cron App</b>',
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            console.log('info =>', info);
            if (error) {
            console.log('error =>',error);
            }
            });
    }


    async sendProductPriceNotifierMail() {
        await this.send(
            'Product Price Notifier',
            'productPriceNotifier'
        );
    }

}


module.exports = Email;