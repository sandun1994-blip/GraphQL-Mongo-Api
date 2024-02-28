import { ObjectId } from "mongodb";

export const userTypeDef = /* GraphQL */ `
  type Query {
    users: [User]
    user(id: String): User
  }

  type Mutation {
    createUser(user: NewUserInput): User
    deleteUser(id: ID!): Boolean
    updateUser(id:ID!,updateUser:updateUserInput):User
  }

  input NewUserInput {
    name: String
    email: String
  }

  input updateUserInput {
    name: String
  }

  type User {
    id: ID!
    name: String
    email: String
  }
`;

export const userResolvers = {
  Query: {
    user: async (_, x, context) => {
      const user = await context.users.findOne({
        _id: new ObjectId(String(x.id)),
      });

      return user;
    },
    users: async (_, x, context) => {
      const users = await context.users.find().limit(2).toArray();
      return users;
    },
  },
  Mutation: {
    createUser: async (_, q, context) => {
      const response = await context.users.insertOne(q.user);
      console.log(response);
      const { name, id, email } = q.user;

      return { name, id: response.insertedId, email };
    },
    deleteUser: async (_, q, context) => {
      const response = await context.users.deleteOne({
        _id: new ObjectId(String(q.id)),
      });
      console.log(response);
      return response.acknowledged;
    },
    updateUser: async (_, q, context) => {

      console.log(q.updateUser);
      const response = await context.users.updateOne({
        _id: new ObjectId(String(q.id))
      },{$set:{name:q.updateUser.name}});
      console.log(response);
      return response;
    },
  },
  User: {
    name: (obj) => {
      return obj.name;
    },
    id: (obj) => {
      return obj._id || obj.id;
    },
  },
};
