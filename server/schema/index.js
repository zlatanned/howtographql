const graphql = require('graphql');
const _ = require('lodash');
const League = require('../models/league');
const Player = require('../models/player');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;

// dummy data
// const players = [
//     { name: 'Lionel Messi', nationality: 'Argentina', club: 'FC Barcelona', age: 33, id: '1', leagueId: '2' },
//     { name: 'Cristiano Ronaldo', nationality: 'Portugal', club: 'Juventus', age: 35, id: '2', leagueId: '3' },
//     { name: 'Eden Hazard', nationality: 'Belgium', club: 'Real Madrid C.F.', age: 29, id: '3', leagueId: '2' },
//     { name: 'Hakim Ziyech', nationality: 'Morocco', club: 'Chelsea F.C.', age: 27, id: '4', leagueId: '1' },
//     { name: 'Angel Di Maria', nationality: 'Argentina', club: 'Paris St. Germain', age: 32, id: '5', leagueId: '4' },
//     { name: 'Kevin De Bruyne', nationality: 'Belgium', club: 'Manchester City', age: 29, id: '6', leagueId: '1' }
// ];

// const leagues = [
//     { name: 'Premier League', nation: 'England', id: '1' },
//     { name: 'La Liga', nation: 'Spain', id: '2' },
//     { name: 'Serie A', nation: 'Italy', id: '3' },
//     { name: 'Ligue 1', nation: 'France', id: '4' }
// ];

const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nationality: { type: GraphQLString },
        club: { type: GraphQLString },
        age: { type: GraphQLInt },
        league: {
            type: LeagueType,
            resolve(parent, args) {
                //return _.find(leagues, { id: parent.leagueId });
            }
        }
    })
});

const LeagueType = new GraphQLObjectType({
    name: 'League',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nation: { type: GraphQLString },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args) {
                //return _.filter(players, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        player: {
            type: PlayerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(players, { id: args.id });
            }
        },
        league: {
            type: LeagueType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(leagues, { id: args.id });
            }
        },
        players: {
            type: new GraphQLList(PlayerType),
            resolve(parent, args){
                //return players;
            }
        },
        leagues: {
            type: new GraphQLList(LeagueType),
            resolve(parent, args){
                //return leagues;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addLeague: {
            type: LeagueType,
            args: {
                name: { type: GraphQLString },
                nation: { type: GraphQLString }
            },
            resolve(parent, args){
                let league = new League({
                    name: args.name,
                    nation: args.nation
                });
                return league.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
