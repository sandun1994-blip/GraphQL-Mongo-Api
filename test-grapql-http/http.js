var {
    graphql,
    buildSchema,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
  } = require("graphql");
  var express = require("express");
  const { createHandler } = require("graphql-http/lib/use/express");
  var { ruruHTML } = require("ruru/server");
  
  // Construct a schema, using GraphQL schema language
  // var schema = buildSchema(`
  //   type Query {
  //     hello(name:String!): String
  //     age:Int
  //     user:User
  //   }
  //   type User {
  //     id:Int
  //     name:String
  //   }
  // `)
  
  const User = new GraphQLObjectType({
    name: "User",
    fields: {
      id: {
        type: GraphQLInt,
      },
      name: {
        type: GraphQLString,
        resolve: (obj) => {
          console.log(obj);
          if (obj.isAdmin) {
            return "mmmm";
          }
          return "kl";
        },
      },
    },
  });
  
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: {
        hello: {
          type: GraphQLString,
          resolve: () => "Hello world",
        },
        user: {
          type: User,
          resolve: () => ({ id: 1, name: "yoo", isAdmin: true }),
        },
      },
    }),
    
  });
  
  // The rootValue provides a resolver function for each API endpoint
  var rootValue = {
    hello: ({ name }) => {
      return "Hello world!   " + name;
    },
    age: () => {
      return 31;
    },
    user: () => {
      return { id: 1, name: "appa" };
    },
  };
  
  const app = express();
  
  app.all("/graphql", createHandler({ schema: schema }));
  app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
  });
  
  // Start the server at port
  app.listen(4000);
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
  