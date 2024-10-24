import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';


const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/all-books")
      .then(res => res.json())
      .then(data => setAllBooks(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/book/${id}`, { 
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`); // Handle non-2xx responses
        }
        return res.json();
      })
      .then(data => {
        alert("Book deleted successfully");
        setAllBooks(allBooks.filter(book => book._id !== id)); // Remove deleted book from the state
      })
      .catch(err => console.error("Error deleting book:", err));
  };
  

  return (
    <div className='px-4 lg:px-0 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Books</h2>
      <Table className='w-full lg:w-auto'>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Book Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Edit-Manage</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allBooks.map((book, index) => (
            <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1} {/* Row number */}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.booktitle} {/* Book title */}
              </Table.Cell>
              <Table.Cell>{book.authorName}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>{book.price ? `$${book.price}` : "$10.00"}</Table.Cell> {/* Dynamic Price */}
              <Table.Cell>
                <Link
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  to={`/admin/dashboard/edit-books/${book._id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ManageBooks;
