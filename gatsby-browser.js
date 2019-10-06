import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

console.log('wesh')

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={apolloClient}>{element}</ApolloProvider>
)
