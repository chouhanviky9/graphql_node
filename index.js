const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { Sequelize } = require("sequelize");
// const {database}= require("./config/database");
const mysql2 = require("mysql2");
const schema = require("./schema/schema");
const app = express();

// database.connect
//     .then(() => {
//         console.log('Connection has been established successfully.');
//         // sequelize.database
//         //     .sync({
//         //         force: false
//         //     })
//         //     .then(async () => {
//                 console.log('Database has been synced successfully.');
//                 // require('./src/migration');
//                 require('./src/services/cache');
//                 // require('./src/services/jobs/tournamentJobs');
//                 // require('./src/services/jobs/streamingJobs');
//                 // require('./src/services/jobs/leaderboardJobs');
//                 // require('./src/services/jobs/cacheJobs');
//             // });
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });


// const auth = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("Connection has been established successfully.");
//     } catch (error) {
//         console.error("Unable to connect to the database:", error);
//     }
// };
// auth();
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

// Construct a schema, using GraphQL schema language

// The root provides a resolver function for each API endpoint
// var root = {
//     hello: () => {
//         return "Hello world!";
//     }
// };

// const events = [];

// var app = express();
// app.use(bodyParser.json());

// app.use(
//     "/graphql",
//     graphqlHTTP({
//         schema: buildSchema(`

//         type event{
//             _id : ID!
//             title:String
//             description:String
//             price:Float
//             date:String
//         }

//         input EventInput{
//             _id : ID
//             title:String
//             description:String
//             price:Float
//             date:String
//         }

//         type RootQuery {
//           events : [event!]!
//         }

//         type RootMutation {
//             createEvent(eventInput:EventInput):String
//         }

//         schema {
//             query:RootQuery
//             mutation:RootMutation
//         }

//       `),
//         rootValue: {
//             events: () => {
//                 return events;
//             },
//             createEvent: (args) => {
//                 const event = {
//                     _id: Math.random().toString(),
//                     title: args.eventInput.title,
//                     description: args.eventInput.description,
//                     price: +args.eventInput.price,
//                     date: args.date
//                 };
//                 events.push(event);
//                 return event;
//             }
//         },
//         graphiql: true
//     })
// );
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
