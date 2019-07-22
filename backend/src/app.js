const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(express.json());

const events = [];

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => events,
      createEvent: ({ eventInput }) => {
        const event = {
          _id: Math.random().toString(),
          ...eventInput,
        };

        events.push(event);

        return event;
      },
    },
    graphiql: true,
  }),
);

module.exports = app;
