import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql/schema.js';
import sequelize from './config/database.js'; // Your Sequelize config
import cors from 'cors'
const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });

  try {
    await sequelize.sync();  // Sync Sequelize models to the database
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

startServer();
