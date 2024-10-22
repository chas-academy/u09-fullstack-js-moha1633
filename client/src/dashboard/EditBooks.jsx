import React, { useState } from 'react';
import { Button, Label, TextInput, Textarea, Select } from "flowbite-react";
import { useParams, useLoaderData } from "react-router-dom";

const EditBooks = () => {
  const { id } = useParams(); // Correctly get the id from the URL
  const bookData = useLoaderData(); // Get the book data from loader
  const { booktitle, authorName, imageUrl, bookdescription, category, bookpdfUrl } = bookData || {};

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

  const [selectedBookCategory, setSelectedBookCategory] = useState(category || bookCategories[0]);

  const handleCategoryChange = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    // Collect form data
    const booktitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageUrl = form.imageUrl.value;
    const bookdescription = form.bookDescription.value;
    const category = form.categoryName.value;
    const bookpdfUrl = form.bookpdfUrl.value;

    // Create book object to send to backend
    const updateBookobj = {
      booktitle,
      authorName,
      imageUrl,
      bookdescription,
      category,
      bookpdfUrl,
    };

    console.log(updateBookobj); // Log the updated book object
    // Here you would usually make a request  API to update the book data

    fetch(`http://localhost:4000/book/${id}`,{
      method:"PATCH",
      headers: {
        "content-type":"application/json"
      },
      body:JSON.stringify(updateBookobj)

    }) .then((res) => res.json())  // Parse response JSON
    .then((data) => {
      console.log('Response from server:', data);  // This will include the _id
      alert("Book updated successfully!");
    })

  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the book data </h2>
      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First row: Book Title and Author Name */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="booktitle" value="Book Title" />
            </div>
            <TextInput
              id="booktitle"
              name='bookTitle'
              defaultValue={booktitle} // Set the default value to existing book title
              placeholder="Book title"
              required
            />
          </div>

          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput
              id="authorName"
              name='authorName'
              defaultValue={authorName} // Set the default value to existing author name
              placeholder="Author Name"
              required
            />
          </div>
        </div>

        {/* Second row: Book Image URL */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageUrl" value="Book Image URL" />
            </div>
            <TextInput
              id="imageUrl"
              name='imageUrl'
              defaultValue={imageUrl} // Set the default value to existing image URL
              placeholder="Book Image URL"
              required
            />
          </div>
        </div>

        {/* Third row: Book Category */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="inputState" value="Book Category" />
          </div>
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
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea
            id="bookDescription"
            name='bookDescription'
            defaultValue={bookdescription} // Set the default value to existing book description
            placeholder="Write a detailed description of the book"
            required
            className='w-full'
            rows={5}
          />
        </div>

        {/* Book PDF URL */}
        <div className='lg:w-1/2'>
          <div className="mb-2 block">
            <Label htmlFor="bookpdfUrl" value="Book PDF URL" />
          </div>
          <TextInput
            id="bookpdfUrl"
            name='bookpdfUrl'
            defaultValue={bookpdfUrl} // Set the default value to existing book PDF URL
            placeholder="Book PDF URL"
            required
          />
        </div>

        {/* Submit button */}
        <Button 
          type="submit" 
          className='mt-5 bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-shadow duration-300'
        >
          Update Book
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;
