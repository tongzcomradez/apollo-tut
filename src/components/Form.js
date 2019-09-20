import React, { useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_TODO, FETCH_TODOS } from '../utils/graphql'

export default () => {
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [createTodo, { loading }] = useMutation(CREATE_TODO, {
    variables: {
      title,
      username,
      content: '',
    },
    update(cache, { data: { createTodo } }) {
      setTitle('')
      setUsername('')
      const { todos } = cache.readQuery({
        query: FETCH_TODOS,
      })

      cache.writeQuery({
        query: FETCH_TODOS, data: {
          todos: [createTodo, ...todos],
        },
      })

    },
  })

  return (
    <Form onSubmit={createTodo}>
      <Form.Group widths='equal'>
        <Form.Field
          id='title'
          control={Input}
          label='Todo Title'
          placeholder='Todo Title'
          onChange={(_, el) => {
            setTitle(el.value)
          }}
          value={title}
        />
        <Form.Field
          id='username'
          control={Input}
          label='Username'
          placeholder='Username'
          onChange={(_, el) => {
            setUsername(el.value)
          }}
          value={username}
        />
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
