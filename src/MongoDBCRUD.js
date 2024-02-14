// Description: REST API with MongoDB
// npm inatall express mongoose body-parser
// Run this file with node MongoDBCRUD.js
// Test with Postman

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Database connection
mongoose.connect(" ", {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const Book = mongoose.model("Book", {
    id: {
        type: String,
        required: true
    },
    title: String,
    author: String,    
});

const app = express();
app.use(bodyParser.json());

// Create
app.post("/books", async (req, res) => {
    try {
        // Get the last book record to deletermine the next ID
        const lastBook = await Book.findOne().sort({ id: -1 });
        const nextId = lastBook ? lastBook.id + 1 : 1;

        // Create a new book with the next ID
        const book = new Book({
            id: nextId,     // Set the custom "id" field
            ...req.body,  // Include other book data from the request body
        });

        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read all
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read one
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOne({ id: req.params.id });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update
app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({ id: req.params.id }, req.body, { 
            new: true,
        });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete
app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ id: req.params.id });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});