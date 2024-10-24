import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]); // State to hold items in the cart

  // UseEffect-hook to fetch data from API when the component loads
  useEffect(() => {
    // Fetch the list of books from backend and update state with fetched data
    fetch("http://localhost:4000/all-books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // Function to handle the "Buy Now" button click
  const handleBuyNow = (book) => {
    // Add the selected book to the cart
    setCart([...cart, book]);
    alert(`${book.booktitle} has been added to your cart!`);
  };

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All Books are here</h2>

      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {books.map(book => (
          <Card key={book._id}> {/* Use a unique key for each card */}
            <img src={book.imageUrl} alt={book.booktitle} className='h-96' />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.booktitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {book.authorName}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {book.bookdescription}
            </p>
          
            <button
              className='bg-red-700 font-semibold text-white py-2 rounded'
              onClick={() => handleBuyNow(book)} // Call handleBuyNow with the selected book
            >
              Buy Now
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Shop;
