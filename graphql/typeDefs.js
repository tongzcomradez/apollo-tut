const { gql } = require('apollo-server')

module.exports = gql`
    type Book {
        id: ID!
        title: String
        author: Author
    }

    type Author {
        id: ID
        name: String
    }

    type Todo {
        id: ID!
        title: String!
        content: String!
        status: String!
    }
    type Query {
        books: [Book]
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
        deleteTodo(id: ID!): String
    }

    type Subscription {
        createTodo: Todo
    }
`
