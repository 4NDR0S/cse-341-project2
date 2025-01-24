const express = require('express');
const bodyParser = require('body-parser')

const mongodb = require('./data/database');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use(bodyParser.json())

//swagger
app.use((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader(
        'Acces-Control-Allow-Headers',
        'Origin, X-Request-with, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
//swagger
app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, ()=> {console.log(`Databse is listening and node Running on port ${port}`)});
    }
});
