require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 4000; // Use PORT from .env or default to 4000

// Middleware
app.use(cors());
app.use(express.json());
// MongoDB Configuration
const uri = process.env.MONGODB_URI; // Use MongoDB URI from .env
if (!uri) {
  console.error('MongoDB URI is not defined in the .env file');
  process.exit(1);
}
// MongoDB Configuration
const uri = process.env.MONGODB_URI; // Use MongoDB URI from .env
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Create a collection of documents
    const bookCollections = client.db("BookInventory").collection("books");

    // Insert a book to the database
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    // Update a book
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = { $set: { ...updateBookData } };
      const result = await bookCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Delete a book
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    // Find books by category
    app.get("/all-books", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close(); // Uncomment if you want to close the connection after each operation
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on Port ${port}`);
});
