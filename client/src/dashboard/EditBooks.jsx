import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBooks = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [bookData, setBookData] = useState({ booktitle: '', category: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch the book details for editing
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:4000/book/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBookData(data); // Assuming data contains the book fields
            } catch (error) {
                console.error('Error fetching book:', error);
                setError(error.message);
            }
        };

        fetchBook();
    }, [id]);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/book/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }
            navigate('/admin/dashboard/manage'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating book:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Edit Book</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="booktitle"
                        value={bookData.booktitle}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={bookData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default EditBooks;
