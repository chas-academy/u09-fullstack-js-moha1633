import React, { useEffect, useState } from 'react';
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
          throw new Error(`Server error: ${res.status}`); 
        }
        return res.json();
      })
      .then(data => {
        alert("Book deleted successfully");
        setAllBooks(allBooks.filter(book => book._id !== id)); 
      })
      .catch(err => console.error("Error deleting book:", err));
  };

  return (
    <div className='px-4 lg:px-0 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Books</h2>

      {/* Ensure horizontal scrolling on smaller screens */}
      <div className="overflow-x-auto">
        <table className='min-w-full table-auto'>
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">No.</th>
              <th className="px-4 py-2 text-left">Book Name</th>
              <th className="px-4 py-2 text-left">Author Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Edit-Manage</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book, index) => (
              <tr key={book._id} className="bg-white">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{book.booktitle}</td>
                <td className="border px-4 py-2">{book.authorName}</td>
                <td className="border px-4 py-2">{book.category}</td>
                <td className="border px-4 py-2">{book.price ? `$${book.price}` : "$10.00"}</td>
                <td className="border px-4 py-2">
                  <Link
                    className="text-blue-500 hover:underline mr-5"
                    to={`/admin/dashboard/edit-books/${book._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 px-4 py-1 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
