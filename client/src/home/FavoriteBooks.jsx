import React, { useEffect, useState } from 'react';
import BookCards from '../components/BookCards';

const FavoriteBooks = () => {
  const [books, setBooks] = useState([]);
  

  useEffect( () => {
    fetch("http://localhost:4000/all-books").then(res => res.json()).then (data => setBooks(data))
  },[])
  return (
    <div>
      <h1 className="text-center text-2xl my-4">Best Seller Books</h1>
      <BookCards books={books} headline="Best Seller Books" />
    </div>
  );
};

// Ensure the export statement is correct
export default FavoriteBooks;