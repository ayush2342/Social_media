
const mongoose = require('mongoose');
const env = require('../config/enviornment')

mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Error connecting to the db'))


db.once('open', function () {
    console.log("Succesfully connected to the Database");
})