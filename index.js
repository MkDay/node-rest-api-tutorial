const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/api');

// setup express app

const app = express();

app.use(express.static('public'));

// dbURI
const dbURI = 'mongodb+srv://MkDay:kpWco2a4eSmv4VIC@cluster0.imtvyn9.mongodb.net/node-rest-api';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, /* useCreateIndex: true */ })

    .then(result => {
        console.log('connected to database');
        app.listen(3000);
    })
    .catch(err => console.log(err));

// json parser middleware
app.use(express.json());

// routes
app.use('/api', router);

// error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});


// listen to requests

// app.listen(process.env.port || 3000, () => {
//     console.log('listening to requests...')
// })