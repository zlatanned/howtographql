const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var players = [
    { name: 'Lionel Messi', nationality: 'Argentina', id: '1' },
    { name: 'Cristiano Ronaldo', nationality: 'Portugal', id: '2' },
    { name: 'Eden Hazard', nationality: 'Belgium', id: '3' },
];

const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        nationality: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                // code to get data from db / other source
                return _.find(players, { id: args.id })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});