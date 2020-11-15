const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/index');

//to fix URLSearchParams not defined error for node version < v10.0.0
//not required if node -v >= 10
const { URLSearchParams } = require('url');
global.URLSearchParams = URLSearchParams;

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema
}));

app.listen(3061, () => console.log('Listening on 3061...'));
