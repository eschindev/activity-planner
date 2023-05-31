const express = require("express");
const db = require("./config/connection");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./schema");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({ schema });

// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars"

// const server = new ApolloServer({
//   schema: makeExecutableSchema({
//     typeDefs: [
//       ...DateTimeTypeDefinition
//     ],
//     resolvers: {
//       ...DateTimeResolver
//     },
//   }),
// });



app.use(express.static(path.join(__dirname, "../client/public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
