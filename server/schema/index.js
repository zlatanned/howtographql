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
        },
        addPlayer: {
            type: PlayerType,
            args: {
                name: { type: GraphQLString },
                position: { type: GraphQLString },
                club: { type: GraphQLString },
                nationality: { type: GraphQLString },
                leagueId: { type: GraphQLID }
            },
            resolve(parent, args){
                let player = new Player({
                    name: args.name,
                    position: args.position,
                    club: args.club,
                    nationality: args.nationality,
                    leagueId: args.leagueId
                });
                return player.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
