require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI; // Get MongoDB URI from .env

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Book Inventory API');
});

// MongoDB configuration
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Validate ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

async function run() {
    try {
        await client.connect();

        const bookCollections = client.db("BookInventory").collection("books");
        const blogCollections = client.db("BookInventory").collection("blogs");

        // --- Book Routes ---

        // Get all books
        app.get('/all-books', async (req, res) => {
            try {
                const books = await bookCollections.find().toArray(); // Fetch all books
                res.json(books); // Send the books as a JSON response
            } catch (error) {
                console.error("Error fetching all books:", error);
                res.status(500).send({ message: "Error fetching all books", error });
            }
        });

        // Create a new book
        app.post("/upload-book", async (req, res) => {
            const { booktitle, authorName, imageUrl, bookdescription, category, bookpdfUrl } = req.body;

            // Validate the necessary fields
            if (!booktitle || !authorName || !imageUrl || !bookdescription) {
                return res.status(400).send({ message: "Book title, author name, image URL, and description are required" });
            }

            const bookData = {
                booktitle,
                authorName,
                imageUrl,
                bookdescription,
                category: category || "Uncategorized",
                bookpdfUrl
            };

            try {
                const result = await bookCollections.insertOne(bookData);
                res.status(201).send(result); // Return the created book object
            } catch (error) {
                console.error("Error uploading book:", error);
                res.status(500).send({ message: "Error uploading book", error });
            }
        });

        // Get a book by ID
        app.get('/book/:id', async (req, res) => {
            const bookId = req.params.id;

            if (!isValidObjectId(bookId)) {
                return res.status(400).send({ message: "Invalid book ID format" });
            }

            try {
                const book = await bookCollections.findOne({ _id: new ObjectId(bookId) });

                if (!book) {
                    return res.status(404).send({ message: "Book not found" });
                }

                res.json(book);
            } catch (error) {
                console.error("Error fetching book:", error);
                res.status(500).send({ message: "Error fetching book", error });
            }
        });

        // Delete a book by ID
        app.delete("/book/:id", async (req, res) => {
            const id = req.params.id;

            if (!isValidObjectId(id)) {
                return res.status(400).send({ message: "Invalid book ID format" });
            }

            try {
                const result = await bookCollections.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: "Book not found" });
                }
                res.send({ message: "Book deleted successfully" });
            } catch (error) {
                console.error("Error deleting book:", error);
                res.status(500).send({ message: "Error deleting book", error });
            }
        });

        // Update a book by ID
        app.put("/book/:id", async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body; // Get the updated book data from the request body

            if (!isValidObjectId(id)) {
                return res.status(400).send({ message: "Invalid book ID format" });
            }

            try {
                const result = await bookCollections.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: updatedData }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: "Book not found" });
                }

                res.send({ message: "Book updated successfully", result });
            } catch (error) {
                console.error("Error updating book:", error);
                res.status(500).send({ message: "Error updating book", error });
            }
        });

        // --- Blog Routes ---

        // Create a new blog
        app.post("/blog", async (req, res) => {
            const { title, content, author } = req.body;

            if (!title || !content || !author) {
                return res.status(400).send({ message: "All fields are required" });
            }

            const newBlog = {
                title,
                content,
                author,
                createdAt: new Date()
            };

            try {
                const result = await blogCollections.insertOne(newBlog);
                res.status(201).send(result);
            } catch (error) {
                console.error("Error creating blog:", error);
                res.status(500).send({ message: "Error creating blog", error });
            }
        });

        // Get all blogs
        app.get("/blog", async (req, res) => {
            try {
                const blogs = await blogCollections.find().toArray();
                res.send(blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                res.status(500).send({ message: "Error fetching blogs", error });
            }
        });

        // Update a blog by ID
        app.put("/blog/:id", async (req, res) => {
            const id = req.params.id;
            const { title, content } = req.body;

            if (!title || !content) {
                return res.status(400).send({ message: "Title and content are required" });
            }

            if (!isValidObjectId(id)) {
                return res.status(400).send({ message: "Invalid blog ID format" });
            }

            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    title,
                    content,
                    updatedAt: new Date()
                }
            };

            try {
                const result = await blogCollections.updateOne(filter, updateDoc);
                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: "Blog not found" });
                }
                res.send({ message: "Blog updated successfully", result });
            } catch (error) {
                console.error("Error updating blog:", error);
                res.status(500).send({ message: "Error updating blog", error });
            }
        });

        // Delete a blog by ID
        app.delete("/blog/:id", async (req, res) => {
            const id = req.params.id;

            if (!isValidObjectId(id)) {
                return res.status(400).send({ message: "Invalid blog ID format" });
            }

            try {
                const result = await blogCollections.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: "Blog not found" });
                }
                res.send({ message: "Blog deleted successfully" });
            } catch (error) {
                console.error("Error deleting blog:", error);
                res.status(500).send({ message: "Error deleting blog", error });
            }
        });

        // Confirm MongoDB connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
