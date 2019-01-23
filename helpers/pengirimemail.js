const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ivanadebora.wuwung@gmail.com',
        pass: 'gjbyvhnutnouqocx'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter