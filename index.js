const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

//Used for Session Cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauth2-strategy')

//Used for Session Cookie storage  in the DB
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

// Setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000')

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Make the upload path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(express.static('./assets'));
app.use(expressLayouts);

//Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//MongoStore is used to store the session cookie in the DB
app.use(session(
    {
        name: 'social_Code',
        //ToDO Change the secret before deployment
        secret: 'blahSomething',
        saveUninitialized: false,
        resave: false,
        cookie:
        {
            maxAge: (1000 * 60 * 100)
        },
        store: MongoStore.create(
            {
                mongoUrl: 'mongodb://127.0.0.1:27017/social_code_development',
                autoRemove: 'disabled'
            }, function (error) {
            console.log(error || 'Connect-Mongo Setup ok');
        }
        )
    }
))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes/index'))



app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the Server. Error is : ${error}`);
        return;
    }
    console.log(`Server is up and running on the port: ${port}`);
})
