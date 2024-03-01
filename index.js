import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { startStandaloneServer } from '@apollo/server/dist/esm/standalone';

// types 
import { typeDefs } from './schema';
// server setup 
const server = new ApolloServer({
    // -- definitions of types of data
    typeDefs 
    // resolvers 

});

const { url } = await startStandaloneServer(server, {
    listen : { port: 4000 }
}); 

console.log('Server ready at port', 4000);