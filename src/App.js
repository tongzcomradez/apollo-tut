import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
} from 'semantic-ui-react'
import ApolloClient from 'apollo-client'

import List from './components/List'
import { useQuery, useApolloClient} from '@apollo/react-hooks'
import { FETCH_TODO, FETCH_TODOS} from './utils/graphql'

function App(props) {
  return (
    <Container>
      <List />
    </Container>
  )
}

export default App
