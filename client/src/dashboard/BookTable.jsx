import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'flowbite-react'; // Import the Table component from Flowbite

const BookTable = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch all books from the API
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:4000/all-books');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to fetch books: ${errorData.message || response.statusText}`);
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError(error.message);
        }
    };

    // Handle delete book
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/book/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to delete book: ${errorData.message || response.statusText}`);
            }
            fetchBooks(); // Refresh the book list after deletion
        } catch (error) {
            console.error('Error deleting book:', error);
            setError(error.message);
        }
    };

    // Navigate to the UploadBook page
    const handleUpload = () => {
        navigate('/upload-book');
    };

    // Navigate to the EditBook page
    const handleEdit = (id) => {
        navigate(`/edit-books/${id}`);
    };

    // UseEffect to fetch books on component mount
    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">Manage Books</h1>
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Upload New Book
            </button>
            {error && <p className="text-red-500">{error}</p>}
            <Table>
                <Table.Head>
                    <Table.HeadCell>#</Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {books.map((book, index) => (
                        <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell>{book.booktitle}</Table.Cell>
                            <Table.Cell>{book.category}</Table.Cell>
                            <Table.Cell>
                                <button
                                    onClick={() => handleEdit(book._id)}
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(book._id)}
                                    className="font-medium text-red-600 hover:underline dark:text-red-500"
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

export default BookTable;


