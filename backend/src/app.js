const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const Event = require('./models/event');

const app = express();

app.use(express.json());

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
      events: async () => {
        try {
          return Event.find();
        } catch (e) {
          throw e;
        }
      },
      createEvent: async ({ eventInput: { date, price, ...rest } }) => {
        const event = new Event({
          date: new Date(date),
          price: parseFloat(price, 10),
          ...rest,
        });

        try {
          return event.save();
        } catch (e) {
          throw e;
        }
      },
    },
    graphiql: true,
  }),
);

module.exports = app;
