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
    }, 
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    }, 
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    }, 
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
        }, 
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        }
    }
}

// query GameQuery($id: ID!) {
//     game(id: $id) {
//         title, 
//         reviews {
//             rating 
//             content 
//         }
//     }
// }

const server = new ApolloServer({
    // -- definitions of types of data
    typeDefs, 
    resolvers 

});

const { url } = await startStandaloneServer(server, {
    listen : { port: 5000 }
}); 

console.log('Server ready at port', 5000);