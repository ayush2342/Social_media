const nodemailer = require('../config/nodemailer');

exports.newComment = async (comment)=>{

    try {
        let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');

    let info = await nodemailer.transporter.sendMail({

        from: 'ayushsharma2342@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "New Commment Published ✔", // Subject line
        // text: "Hello world?", // plain text body
        html: htmlString // html body
    })

    console.log("Message sent: ", info);
        
    } catch (error) {

        console.log('Error in sending mail', error);
        return;
    }
    
}
