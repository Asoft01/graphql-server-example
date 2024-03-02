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
        game(_, args) {
            return db.games.find((game) => game.id === args.id) 
        }, 
        authors() {
            return db.authors
        }, 
        author(_, args) {
            return db.authors.find((author) => author.id === args.id)
        }, 
        reviews() {
            return db.reviews
        }, 
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id)
        }
    }    
}

const server = new ApolloServer({
    // -- definitions of types of data
    typeDefs, 
    resolvers 

});

const { url } = await startStandaloneServer(server, {
    listen : { port: 5000 }
}); 

console.log('Server ready at port', 5000);