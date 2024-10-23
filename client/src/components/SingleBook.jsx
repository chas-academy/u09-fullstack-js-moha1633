import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:4000/book/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBook();
  }, [id]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!book) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-4">{book.booktitle}</h1>
      <img className="w-full h-auto rounded-md mb-4" src={book.imageUrl} alt={book.booktitle} />
      <p className="text-lg mb-2">
        <strong>Author:</strong> {book.authorName}
      </p>
      <p className="text-lg mb-2">
        <strong>Category:</strong> {book.category}
      </p>
      <p className="text-lg mb-4">
        <strong>Description:</strong> {book.bookdescription}
      </p>
      <p className="text-lg mb-4">
        <strong>Published Year:</strong> {book.publishedYear}
      </p>
      <a 
        className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200" 
        href={book.bookpdfUrl} 
        download
      >
        Download Book PDF
      </a>
    </div>
  );
};
