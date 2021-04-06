const { dbURL } = require('../../config');
const mongoose = require('mongoose')
mongoose.connect(dbURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:true,
    }).then(connection => {
        console.log('Connected to mongoDB')
    }).catch(error => {
        console.log('error', error.message)
    });