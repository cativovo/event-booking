const express = require('express');
const graphqlHttp = require('express-graphql');
const rootValue = require('./graphql/resolvers/root');
const schema = require('./graphql/schema/index');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(auth);

app.use(
  '/graphql',
  graphqlHttp({
    schema,
    rootValue,
    graphiql: true,
  }),
);

module.exports = app;
