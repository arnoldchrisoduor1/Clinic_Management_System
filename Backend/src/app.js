const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authMiddleware = require('./middleware/auth');
const db = require('./config/database'); // Correct import
require('dotenv').config();

const app = express();

// Function to check database connection
const checkDatabaseConnection = async () => {
    try {
        const client = await db.pool.connect(); // Correctly access the pool
        await client.query('SELECT NOW()'); // Run a simple query
        console.log('Database connection successful!');
        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1); // Exit the process if there's an error
    }
};

async function startApolloServer() {
    // Check database connection
    await checkDatabaseConnection();
    
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: async ({ req }) => {
            const auth = await authMiddleware(req);
            return auth;
        }
    });
    
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.SERVER_PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startApolloServer();
