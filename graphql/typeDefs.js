const { gql } = require('apollo-server')

module.exports = gql`
    type Todo {
        id: ID!
        _id: ID
        title: String!
        content: String!
        status: String!
    }
    type Query {
        todos: [Todo]
        todo(id: ID!): Todo
    }
    
    input inputTodo {
        title: String!
        content: String!
        username: String!
    }
    
    type Mutation {
        createTodo(input: inputTodo): Todo
        updateTodo(id: ID): Todo
    }
`
