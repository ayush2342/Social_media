const nodemailer = require('../config/nodemailer');

exports.resetPassword = async (resetPasswordUser)=>{

    try {
        let htmlString = nodemailer.renderTemplate({resetPasswordUser:resetPasswordUser},'/resetPassword.ejs');

    let info = await nodemailer.transporter.sendMail({

        from: 'testa8663@gmail.com', // sender address
        to: resetPasswordUser.user.email, // list of receivers
        subject: "Reset Password Link 🔑", // Subject line
        // text: "Hello world?", // plain text body
        html: htmlString // html body
    })

    console.log("Message sent");
    return;
        
    } catch (error) {

        console.log('Error in sending mail', error);
        return;
    }
    
}
