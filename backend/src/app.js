const express = require('express');
const cors = require('cors');
const graphqlHttp = require('express-graphql');
const rootValue = require('./graphql/resolvers/root');
const schema = require('./graphql/schema/index');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,OPTIONS,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
// app.use((req, res, next) => console.log(req));
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
