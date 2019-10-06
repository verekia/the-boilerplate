import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const getNoteQuery = gql`
  query($id: ID!) {
    getNote(id: $id) {
      id
      title
      description
    }
  }
`

const NotePage = ({ id }: any) => {
  const { data } = useQuery(getNoteQuery, { variables: { id } })
  const note = data && data.getNote
  return <div>{note ? <h1>{note.title}</h1> : <h2>No note here...</h2>}</div>
}

export default NotePage
