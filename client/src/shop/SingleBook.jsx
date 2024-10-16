import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleBook = () => {
    const { _id ,booktitle, imageUrl } = useLoaderData();
  return (
    <div className='mt-28 px-4 lg:px-24'> 
    <img src={imageUrl} alt="" className='h-98' />
    
    <h2>{booktitle}</h2>
    
    </div>
  )
}


export default SingleBook
