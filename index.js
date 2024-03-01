import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { startStandaloneServer } from '@apollo/server/dist/esm/standalone';

// db 
import db from './_db.js'; 

// types 
import { typeDefs } from './schema.js';
// server setup 

const resolvers = {
    Query: {
        games() {
            return db.games
        }, 
        authors() {
            return db.authors
        }, 
        reviews() {
            return db.reviews
        }
    }    
}


const server = new ApolloServer({
    // -- definitions of types of data
    typeDefs, 
    resolvers 

});

const { url } = await startStandaloneServer(server, {
    listen : { port: 6000 }
}); 

console.log('Server ready at port', 6000);