const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db= require('./config/mongoose')

//Used for Session Cookie
const session= require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-statergy');


app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

//Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//Set up the view engine

app.set('view engine','ejs');
app.set('views','./views');

app.use(session(
    {
        name:'social_Code',
        //ToDO Change the secret before deployment
        secret:'blahSomething',
        saveUninitialized:false,
        resave:false,
        cookie:
        {
            maxAge:(1000*60*100)
        }
    }
))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// Use express router
app.use('/',require('./routes/index'))


app.listen(port,function(error)
{
    if(error)
    {
        console.log(`Error in running the Server. Error is : ${error}`);
        return;
    }
    console.log(`Server is up and running on the port: ${port}`);
})
