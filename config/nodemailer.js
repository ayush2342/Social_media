const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env=require('../config/enviornment')


let transporter = nodemailer.createTransport(env.smpt);


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