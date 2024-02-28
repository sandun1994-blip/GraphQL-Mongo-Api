import { createSchema } from "graphql-yoga";
import { userTypeDef as User, userResolvers } from "../models/user.js";
import _ from "lodash";

const quires = /* GraphQL */ `
  type Query {
    hello: String
  }
`;



const resolvers ={
    Query: {
      hello: () => "Hello from Yoga!",
     
    },
   
  }

export const schema = createSchema({
  typeDefs: [quires, User],
  resolvers:_.merge(resolvers,userResolvers)
});
