import React from 'react'

export interface NoteProps {
  id: string
  title: string
  description?: string
}

const Note = ({ title, description }: NoteProps) => (
  <div>
    {title} - {description}
  </div>
)

export default Note
