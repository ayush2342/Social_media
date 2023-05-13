const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'testa8663@gmail.com', 
      pass: 'ocdnboogdfgayine'
    }
  });


  let renderTemplate = (data,relativePath) =>{

    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(error,template)
        {
            if(error)
            {
                console.log('Error in rendering template',error);
                return;
            }

            mailHTML= template;
        }
    )

    return mailHTML;

  }

  module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
  }