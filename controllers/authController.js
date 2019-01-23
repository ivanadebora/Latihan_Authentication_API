var Crypto = require('crypto');
var conn = require('../database');
var transporter = require('../helpers/pengirimemail')


module.exports = {
    register: (req,res) => {
        var {username, password, email, phone} = req.body;
        var sql = `SELECT username from user WHERE username='${username}'`
        conn.query(sql, (err,results) => {
            if(err){
                // res.send({status: 'error', message: 'System Error'});
                // res.end();
                throw err
            }
            if(results.length > 0){
                res.send({status: 'error', message: 'Username has been taken!'})
            }
            else {
                var hashPassword = Crypto.createHmac('sha256', 'abc123').update(password).digest('hex');
                var dataUser = {
                    username,
                    password: hashPassword,
                    email,
                    phone,
                    role: 'User',
                    status: 'Unverified',
                    lastlogin: new Date()
                }
                sql = `INSERT into user SET ?`;
                conn.query(sql, dataUser, (err1, res1) => {
                    if(err1) {
                        // res.send({status:'error', message:'System Error'})
                        // res.end();
                        throw err1
                        
                    }
                    var linkverifikasi = `http://localhost:3000/verified?username=${username}&password=${hashPassword}`;
                    var mailOption = {
                        from: 'Ivana Debora Wuwung <ivanadebora.wuwung@gmail.com>',
                        to: email,
                        subject: 'Verifikasi Email',
                        html: `Tolong click link ini untuk verifikasi : <a href="${linkverifikasi}">Click Me!</a>`
                    }
                    transporter.sendMail(mailOption, (err2, res2) => {
                        if(err2) {
                            console.log(err2)
                            // res.send('Error')
                            // res.send({status:'Error', message: "Error sending email"})
                            throw err2
                        }
                        else {
                            console.log('Success!')
                            // res.send('Success')
                            res.send({username, email, role:'User', status:'Unverified', token:''})
                        }
                    })
                })
            }
        })
    },
    signin: (req,res) => {

    }
}