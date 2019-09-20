import React, { Fragment } from 'react'
import { List, Button, Container } from 'semantic-ui-react'
import { useSubscription, useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { FETCH_TODOS, UPDATE_TODO, DELETE_TODO } from '../utils/graphql'
import Form from '../components/Form'
import gql from 'graphql-tag'
const COMMENTS_SUBSCRIPTION = gql`
subscription createTodo{
  createTodo {
    title
  }
}
`;

function DontReadTheComments({ repoFullName }) {
  const { data, loading } = useSubscription(
    COMMENTS_SUBSCRIPTION,
  );
  console.log('sub', data)
  return <h4>New comment:</h4>;
}

const ListExampleDivided = () => {
  const client = useApolloClient()
  const fetchTodo = () => {
    const data = client.readQuery({
      query: FETCH_TODOS,
    })
    console.log('xxx', data)
  }
  const [updateTodo] = useMutation(UPDATE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_TODOS
      });
      data.todos = data.todos.filter((t) => t.id !== result.data.deleteTodo);
      cache.writeQuery({ query: FETCH_TODOS, data });
    }
  })


  const { loading, data, error } = useQuery(FETCH_TODOS)
  if (loading) return <div>...Loading</div>
  if (error) return <div>Error {error.message} </div>

  return (
    <Fragment>

      <Form />

      <List
        divided
        relaxed
        verticalAlign='middle'
      >
<DontReadTheComments />
        {
          data.todos.map(todo => (
            <List.Item key={todo.id}>
              <List.Content floated='right'>
                <Button
                  color='warning'
                  onClick={() => fetchTodo({ variables: { id: todo.id } })}
                >view</Button>

                <Button
                  color='green'
                  onClick={() => updateTodo({ variables: { id: todo.id } })}
                >success</Button>
                <Button
                  onClick={() => deleteTodo({ variables: { id: todo.id } })}
                  color='red'
                >remove</Button>
              </List.Content>
              <List.Icon
                name='github'
                size='large'
                verticalAlign='middle'
              />
              <List.Content>{todo.title}</List.Content>
              <List.Content>{todo.status}</List.Content>
            </List.Item>
          ))
        }
      </List>
    </Fragment>
  )
}

export default ListExampleDivided
