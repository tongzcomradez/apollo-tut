import gql from 'graphql-tag'

export const FETCH_TODOS = gql`
    {
        todos {
            id
            title
            status
        }
    }
`
export const FETCH_TODO = gql`
    query todo($id: ID!){
        todo(id: id) {
            id
            title
            status
        }
    }
`

export const UPDATE_TODO = gql`
    mutation updateTodo($id: ID!) {
        updateTodo(id: $id) {
            id
            title
            status
        }
    }
`

export const DELETE_TODO = gql`
    mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id)
    }
`
export const CREATE_TODO = gql`
    mutation createTodo($title: String!, $content: String!, $username: String!) {
        createTodo(input: {title: $title, content: $content, username: $username}) {
            id
            title
            status
        }
    }
`
