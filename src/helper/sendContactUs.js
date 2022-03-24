const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

exports.sendContactUs = (body) =>{
    console.log("data",body);
  return new Promise((resolve, reject)=>{
    const message = {
      from: process.env.EMAIL_USERNAME, 
      to: body.email, 
      subject: "RAZZ ADMIN", 
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
              * {
                  font-family: sans-serif;
              }
              h2 {
                  text-align: center;
                  background: #c82022;
                  line-height: 60px;
                  margin: 30px auto;
                  color: #fff;
              }
              .link {
                  display: inline-block;
                  width: 250px;
                  height: 40px;
                  line-height: 40px;
                  text-decoration: none;
                  color: #ffffff !important;
                  font-weight: bold;
                  text-align: center;
                  background: #c82022;
                  margin-left: 37%;
                  border-radius: 10px;
              }
              .link-1{
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <h2>Hi, ${body.username}</h2>
          <p>kami telah menerima permintaan kerjasama anda mungkin akan kami pertimbangkan dalam 2X24 jam untuk pemberitahuan lebih lanjut</p>
      </body>
      </html>`, 
    }
    transporter.sendMail(message, (error, info) => {

      if (error) {
        // console.log('Error occurred');
        // console.log(error.message);
        // return process.exit(1);
        console.log(error)
        reject(error)
      }else{
        resolve(info)
      }
      });
  })

}