const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/index');

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema
}));

app.listen(3061, () => console.log('Listening on 3061...'));