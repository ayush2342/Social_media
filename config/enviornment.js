
const fs = require('fs');
const rfs = require('rotating-file-stream');

const path=require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});

const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahSomething',
    db:'social_code_development',
    smpt:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'testa8663@gmail.com', 
          pass: 'ocdnboogdfgayine'
        }
      },
    google_client_id:"694532115132-pfh3t3tmnbqcuf6ieqrelnlii2amsgqq.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_URL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'socialcode',
    morgan:{
      mode:'dev',
      options:{stream:accessLogStream}
    }
}

const production = {
    name:'production',
    asset_path:process.env.SOCIALCODE_ASSET_PATH,
    session_cookie_key:process.env.SOCIALCODE_SESSION_COOKIE_KEY,
    db:process.env.SOCIALCODE_DB,
    smpt:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SOCIALCODE_GMAIL_USERNAME, 
          pass: process.env.SOCIALCODE_GMAIL_PASSWORD
        }
      },
    google_client_id:process.env.SOCIALCODE_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.SOCIALCODE_GOOGLE_CLIENT_SECRET,
    google_call_back_URL:process.env.SOCIALCODE_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.SOCIALCODE_JWT_SECRET,
    morgan:{
      mode:'combined',
      options:{stream:accessLogStream}
    }
}

module.exports = eval(process.env.NODE_ENV) == undefined?development:eval(process.env.NODE_ENV) ;