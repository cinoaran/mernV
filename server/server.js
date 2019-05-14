const express = require('express');
const mongoose = require('mongoose');
const morgan =  require('morgan');
const config = require('config');
const cors = require('cors');


const db = config.get('mongoURI');

// SET UP FOR MONGOOSE PROMISE TO GLOBAL
// mongoose.Promise = global.Promise

// Mongo connection if depWarns
// mongoose.Promise = global.Promise
mongoose.connect(db,{ useCreateIndex: true, useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const app = express();
app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/auth', require('./routes/api/auth'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port}`);