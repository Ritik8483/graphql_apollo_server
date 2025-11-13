// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
//   {
//     title: 'Ritik Chauhan Vats',
//     author: 'All gud',
//   },
// ];

// const typeDefs = `
// type Book {
//     title: String
//     author: String
//   }
// type Query {
//     books: [Book]
//   }
// `;

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);





// ------------------------
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser"); 
const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = require("@apollo/server/express4");
const { expressMiddleware } = require('@as-integrations/express4');
const sequelize = require("./sequelizeFile"); 
const typeDefs = require("./src/graphql/schema");
const resolvers = require("./src/graphql/resolvers");
const { authMiddleware } = require("./src/middleware/authMiddleware");

const PORT = 4000;

async function startApolloServer() {
  // Initialize Express
  const app = express(); 
  // ✅ Apply global middlewares FIRST
  app.use(cors());
  app.use(express.json()); // <--- must be before Apollo middleware

  // Initialize Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
  await apolloServer.start();

  // Middleware setup
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
    //   context: async ({ req }) => {          //used to enable middleware
        // Optional: add auth or user info to context
        // const contextData = await authMiddleware(req);
        // return contextData;
    //   }, 
    })
  );

  // Connect to DB
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to DB:", error);
  }

  // Start Express server
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();


//oncle middleware is enable login first
// mutation {
//   login(email: "ritik@example.com", password: "123456") {
//     id
//     email
//     token
//   }
// }