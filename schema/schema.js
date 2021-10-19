const graphql = require("graphql");
const book = require("../models/book");
const {author} = require("../models/author");
const sequelize = require("../config/database")
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const _ = require("lodash");
const create=require("sequelize").create;

//dummy data
// var books = [
//     { name: "this first book", genre: "fantasy", id: "1",authorId: "1"},
//     { name: "this second book", genre: "higy", id: "2",authorId: "2" },
//     { name: "this third book", genre: "yum", id: "3",authorId: "3"},
//     {name: "this fourth book", genre: "yahi", id: "4",authorId: "3"}
// ];

// var authors = [
//     { name: "first", age: 23, id: "1" },
//     { name: "second", age:34, id: "2" },
//     { name: "third", age:41, id: "3" }
// ];

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book: {
            type: new GraphQLList(BookType),
            resolve(Parent, args) {
                // return _.filter(books, {authorId:Parent.id})
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(Parent, args) {
                // return _.find(authors,{id:Parent.authorId})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(Parent, args) {
                //code to get from db
                // return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(Parent, args) {
                // return _.find(authors, {id:args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(Parent, args) {
                // return (books);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(Parent, args) {
                // return (authors);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { 
                name: { type: GraphQLString } ,
                age : {type: GraphQLInt}
            },
            resolve(Parent, args){
                console.log("im here",args)
                let data={
                    name:args.name,
                    age:args.age
                }
            author
            .create(data).then((data)=>{
                console.log("ok")
                console.log("Data >>>",data)
            })
            .catch(err=>{
                console.log(err)
            })
            return data;
            }

        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});
