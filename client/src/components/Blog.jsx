import React, { useEffect, useState } from 'react';

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:4000/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const createBlog = async (e) => {
    e.preventDefault();
    const newBlog = { title, content, author };

    try {
      const response = await fetch('http://localhost:4000/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      const createdBlog = await response.json();
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
      resetForm();
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(error.message); // Alert user about the error
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    const updatedBlog = { title, content, author }; // Include author if needed

    try {
      const response = await fetch(`http://localhost:4000/blog/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      const result = await response.json();
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog._id === editingId ? { ...blog, ...updatedBlog } : blog))
      );
      resetForm();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating blog:", error);
      alert(error.message); // Alert user about the error
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`http://localhost:4000/blog/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete blog: ${response.status} ${response.statusText}`);
        }

        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog. Please try again later.");
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setAuthor('');
    setEditingId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Blog Posts</h1>

      <form onSubmit={editingId ? updateBlog : createBlog} className="mb-6 bg-white p-4 rounded shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          {editingId ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>

      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-gray-100 p-4 rounded shadow">
              <h2 className="text-2xl font-semibold">{blog.title}</h2>
              <p className="mt-2">{blog.content}</p>
              <p className="mt-2 text-gray-600">
                <strong>Author:</strong> {blog.author}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => editBlog(blog)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="bg-red-600 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No blog posts available</p>
        )}
      </div>
    </div>
  );
};

