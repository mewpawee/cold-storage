import { ApolloServer, AuthenticationError } from "apollo-server-express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from 'cors';
import express from 'express';
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
//const uri = `mongodb+srv://paweemew:pawee2540@cluster0.5yikx.mongodb.net/test?retryWrites=true&w=majority`;
const uri = `mongodb://${db_username}:${db_password}@database:${db_port}`;
const mongo_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  dbName: `${db_name}`,
};

// TODO: initial and connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(uri, mongo_options);

// TODO: import TypeDefs and Resolvers
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();
app.use(cors());

const getUser = async (req) => {
  var token = req.headers["token"];
  if (token) {
    if(token.startsWith('Bearer ')){
      token = token.slice(7, token.length).trimLeft();
    }else{
      throw new AuthenticationError("can't find Bearer");
    }
    try {
      return await jwt.verify(token, "riddlemethis");
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in agian.");
    }
  }
};
// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);
      
      return {
        me,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen(4000, () => {
  console.log(`🚀  Server ready at 4000`);
});
