import React, { useEffect, useState } from 'react';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:4000/all-books');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <h1>Manage Books</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td>{book.booktitle}</td>
                            <td>{book.category}</td>
                            <td>
                                <button onClick={() => editBook(book._id)}>Edit</button>
                                {/* Add other action buttons if needed */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const editBook = (id) => {
    // Navigate to the edit book page
    window.location.href = `/admin/dashboard/edit-books/${id}`;
};

export default ManageBooks;
