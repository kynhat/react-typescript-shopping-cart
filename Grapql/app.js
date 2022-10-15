const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./schema/schema.js');
const resolvers = require('./resolver/resolver.js');

const mongoDataMethods = require('./data/db');

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://hathanhdung1995:1234@testgraph.qbydxiv.mongodb.net/?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    }
    catch (err){
        console.log(err);
        process.exit(1);
    }
}

connectDB();
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({mongoDataMethods})
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    return apolloServer;
}
startServer();
const app = express();
app.listen({port : 4000},() => {
    console.log(`Server ready at http://localhost:4000`)
})