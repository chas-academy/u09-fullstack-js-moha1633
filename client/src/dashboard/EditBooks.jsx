import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";

const EditBooks = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [bookData, setBookData] = useState({}); // State to hold book data
    const [error, setError] = useState(''); // State to hold error messages
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const navigate = useNavigate(); // Hook to programmatically navigate
    const bookCategories = [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Programming",
        "Science Fiction",
        "Fantasy",
        "Horror",
        "Biography",
        "Autobiography",
        "History",
        "Self-Help"
    ];

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]); // Default category

    const handleCategoryChange = (event) => {
        setSelectedBookCategory(event.target.value); // Update selected category
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const form = event.target;

        const bookData = {
            booktitle: form.bookTitle.value,
            authorName: form.authorName.value,
            imageUrl: form.imageUrl.value,
            bookdescription: form.bookDescription.value,
            category: selectedBookCategory, // Use selected category state
            bookpdfUrl: form.bookpdfUrl.value,
        };

        try {
            const response = await fetch(`http://localhost:4000/book/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            console.log(result); // Handle success
            setSuccessMessage("Update successful!"); // Set success message
            setError(''); // Clear any previous error messages
            
            // Redirect to manage books after a delay
            setTimeout(() => {
                navigate('/admin/dashboard/manage'); // Redirect to Manage Books
            }, 3000);
        } catch (error) {
            console.error("Error updating book:", error);
            setError(error.message); // Handle error display
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    // Fetch existing book data when the component mounts
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/book/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }
                const data = await response.json();
                setBookData(data);
                setSelectedBookCategory(data.category || bookCategories[0]); // Set default category if none found
            } catch (error) {
                console.error('Error fetching book data:', error);
                setError(error.message);
            }
        };

        fetchBookData();
    }, [id]);

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Update the book data</h2>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message if present */}
            {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message if present */}
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-4xl"> {/* Use grid layout */}
                {/* First row: Book Title and Author Name */}
                <div>
                    <Label htmlFor="booktitle" value="Book Title" />
                    <TextInput
                        id="booktitle"
                        name='bookTitle'
                        placeholder="Book title"
                        required
                        type='text'
                        defaultValue={bookData.booktitle || ''} // Use bookData for default value
                    />
                </div>
                <div>
                    <Label htmlFor="authorName" value="Author Name" />
                    <TextInput
                        id="authorName"
                        name='authorName'
                        placeholder="Author Name"
                        required
                        type='text'
                        defaultValue={bookData.authorName || ''} // Use bookData for default value
                    />
                </div>
                {/* Second row: Book Image URL */}
                <div className='col-span-1 md:col-span-2'>
                    <Label htmlFor="imageUrl" value="Book Image URL" />
                    <TextInput
                        id="imageUrl"
                        name='imageUrl'
                        placeholder="Book Image URL"
                        required
                        type='url'
                        defaultValue={bookData.imageUrl || ''} // Use bookData for default value
                    />
                </div>
                {/* Third row: Book Description */}
                <div className='col-span-1 md:col-span-2'>
                    <Label htmlFor="bookDescription" value="Book Description" />
                    <Textarea
                        id="bookDescription"
                        name='bookDescription'
                        placeholder="Book Description"
                        required
                        rows={4}
                        defaultValue={bookData.bookdescription || ''} // Use bookData for default value
                    />
                </div>
                {/* Fourth row: Category */}
                <div className='col-span-1 md:col-span-2'>
                    <Label htmlFor="categoryName" value="Category" />
                    <Select
                        id="categoryName"
                        name="categoryName"
                        onChange={handleCategoryChange}
                        required
                        value={selectedBookCategory} // Controlled component for category
                    >
                        {bookCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Select>
                </div>
                {/* Fifth row: Book PDF URL */}
                <div className='col-span-1 md:col-span-2'>
                    <Label htmlFor="bookpdfUrl" value="Book PDF URL" />
                    <TextInput
                        id="bookpdfUrl"
                        name='bookpdfUrl'
                        placeholder="Book PDF URL"
                        required
                        type='url'
                        defaultValue={bookData.bookpdfUrl || ''} // Use bookData for default value
                    />
                </div>
                {/* Submit button */}
                <div className='col-span-1 md:col-span-2'>
                    <Button type="submit" className='mt-5 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-shadow duration-300 w-full'>
                        Update Book
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditBooks;
