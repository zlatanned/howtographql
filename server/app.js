const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/index');
const mongoose = require('mongoose');

//to fix URLSearchParams not defined error for node version < v10.0.0
//not required if node -v >= 10
const { URLSearchParams } = require('url');
global.URLSearchParams = URLSearchParams;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to Mongodb !'));

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3061, () => console.log('Listening on 3061...'));
