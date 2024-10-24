import React, { useState } from 'react';
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { useNavigate } from 'react-router-dom';


const UploadBook = () => {
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

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleBookSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const bookobj = {
      booktitle: form.bookTitle.value,
      authorName: form.authorName.value,
      imageUrl: form.imageUrl.value,
      bookdescription: form.bookDescription.value,
      publishedYear: "Unknown",
      category: form.categoryName.value,
      bookpdfUrl: form.bookpdfUrl.value,
    };

    console.log("Book Object:", bookobj); // Log the book object

    try {
      const response = await fetch("http://localhost:4000/upload-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookobj),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData); // Log error response for debugging
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response from server:', data);
      setMessage("Book uploaded successfully!");
      setTimeout(() => {
        navigate('/'); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error uploading the book:", error);
      setMessage("An error occurred while uploading the book. Please try again.");
    }
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">

        {/* Book Title and Author Name */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="booktitle" value="Book Title" />
            <TextInput
              id="booktitle"
              name='bookTitle'
              placeholder="Book title"
              required
            />
          </div>

          <div className='lg:w-1/2'>
            <Label htmlFor="authorName" value="Author Name" />
            <TextInput
              id="authorName"
              name='authorName'
              placeholder="Author Name"
              required
            />
          </div>
        </div>

        {/* Book Image URL */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <Label htmlFor="imageUrl" value="Book Image URL" />
            <TextInput
              id="imageUrl"
              name='imageUrl'
              placeholder="Book Image URL"
              required
            />
          </div>
        </div>

        {/* Book Category */}
        <div className='lg:w-1/2'>
          <Label htmlFor="inputState" value="Book Category" />
          <Select
            id="inputState"
            name="categoryName"
            className="w-full rounded"
            value={selectedBookCategory}
            onChange={handleCategoryChange}
            required
          >
            {bookCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        {/* Book Description */}
        <div className='w-full'>
          <Label htmlFor="bookDescription" value="Book Description" />
          <Textarea
            id="bookDescription"
            name='bookDescription'
            placeholder="Write a detailed description of the book"
            required
            className='w-full'
            rows={5}
          />
        </div>

        {/* Book PDF URL */}
        <div className='lg:w-1/2'>
          <Label htmlFor="bookpdfUrl" value="Book PDF URL" />
          <TextInput
            id="bookpdfUrl"
            name='bookpdfUrl'
            placeholder="Book PDF URL"
            required
          />
        </div>

        {/* Submit button */}
        <Button 
          type="submit" 
          className='mt-5 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-shadow duration-300'
        >
          Upload Book
        </Button>
      </form>
    </div>
  );
};

export default UploadBook;
