import { ApolloServer } from "apollo-server-micro";
import schema from "graphql/schema";
import prisma from "lib/prisma";

const apolloServer = new ApolloServer({
  schema,
  context: {
    db: prisma,
    company: process.env.COMPANY,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/fabapi" });
