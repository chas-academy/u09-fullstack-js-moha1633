import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleBook = () => {
  const book = useLoaderData(); // Get the book data from the loader

  // If book data is not loaded yet, you can display a loading message or spinner
  if (!book) {
    return <p>Loading...</p>;
  }

  const { _id, booktitle, imageUrl, bookdescription } = book;

  return (
    <div className='mt-28 px-4 lg:px-24'>
      {imageUrl && <img src={imageUrl} alt={booktitle} className='h-98' />}
      <h2 className='text-3xl font-bold'>{booktitle}</h2>
      <p className='mt-4'>{bookdescription}</p> {/* Display book description if available */}
    </div>
  );
};

export default SingleBook;

