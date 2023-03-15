const express = require('express');
const app = express();
const port = 8000;

// Use express router
app.use('/',require('./routes'))

app.listen(port,function(error)
{
    if(error)
    {
        console.log(`Error in running the Server. Error is : ${error}`);
        return;
    }
    console.log(`Server is up and running on the port: ${port}`);
})