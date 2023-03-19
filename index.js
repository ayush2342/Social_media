const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);

//Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Use express router
app.use('/',require('./routes/index'))

//Set up the view engine

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(error)
{
    if(error)
    {
        console.log(`Error in running the Server. Error is : ${error}`);
        return;
    }
    console.log(`Server is up and running on the port: ${port}`);
})
