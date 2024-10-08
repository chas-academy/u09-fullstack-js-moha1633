import React from 'react'
import { useLoaderData } from 'react-router-dom'

export const SingleBook = () => {
    const {_id
      , booktitle} = useLoaderData ();

  return (
    <div>SingleBook{_id
}</div>
  )
}

export default SingleBook