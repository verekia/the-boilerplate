import React, { useContext } from 'react'

import Note, { NoteProps } from 'note/cmp/Note'
import { useSelector } from 'react-redux'

const App = () => {
  const { staticBaseUrl } = useSelector((state: any) => state.config)

  return (
    <div>
      <h1>App</h1>
      {/* {pageData && pageData.notes.map((n: NoteProps) => <Note key={n.id} {...n} />)} */}
      <img src={`${staticBaseUrl}/img/html5-logo.png`} />
    </div>
  )
}

export default App
