// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

const readFileAsync = util.promisify(fs.readFile);
app.use(express.static("public"));


// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));    
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

// API routes
app.get("/api/notes", (req, res) => {
    // Should read the `db.json` file and return all saved notes as JSON.
  });
app.post("/api/notes", (req, res) => {
    // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  });
app.delete("/api/notes:id", (req, res) => {
    // Should receive a query parameter containing the id of a note to delete.
  });





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });