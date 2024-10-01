require('dotenv').config();  // Load environment variables

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;  // Get MongoDB URI from .env

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('skogblad');
});

// MongoDB configuration
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const bookCollections = client.db("BookInventory").collection("books");

        // Insert a book into the DB: POST method
        app.post("/upload-book", async (req, res) => {
            const { booktitle, imageUrl, category } = req.body;

            // Ensure the book has all necessary data before inserting
            if (!booktitle || !imageUrl) {
                return res.status(400).send({ message: "Book title and image URL are required" });
            }

            const bookData = {
                booktitle,
                imageUrl,
                category: category || "Uncategorized", // Default category
            };

            const result = await bookCollections.insertOne(bookData);
            res.send(result);
        });

        // Get all books from the database
        app.get("/all-books", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { category: req.query.category };
            }
            const result = await bookCollections.find(query).toArray();
            res.send(result);
        });

        // Update a book: PATCH method
        app.patch("/book/:id", async (req, res) => {
            const id = req.params.id;
            const updateBookData = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };

            const updateDoc = {
                $set: {
                    ...updateBookData
                }
            };

            const result = await bookCollections.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // Update Image URL: PATCH method
        app.patch("/update-image-url/:id", async (req, res) => {
            const id = req.params.id; 
            const { newImageUrl } = req.body; 

            try {
                const filter = { _id: new ObjectId(id) }; 
                const updateDoc = {
                    $set: {
                        imageUrl: newImageUrl 
                    }
                };

                const result = await bookCollections.updateOne(filter, updateDoc); 
                if (result.matchedCount > 0) {
                    res.send({ message: "Image URL updated successfully", result });
                } else {
                    res.status(404).send({ message: "Book not found" });
                }
            } catch (error) {
                console.error("Error updating image URL:", error);
                res.status(500).send("Error updating image URL");
            }
        });

        // Delete a book: DELETE method
        app.delete("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.deleteOne(filter);
            res.send(result);
        });

        // Confirm MongoDB connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error(error);
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
