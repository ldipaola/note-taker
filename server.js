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

app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));    
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

// API routes
app.get("/api/notes", (req, res) => {
    // read the `db.json` file and return all saved notes as JSON.
    let rawData = fs.readFileSync(__dirname + '/db/db.json');
    let data = JSON.parse(rawData);
    return res.json(data);
  });
app.post("/api/notes", (req, res) => {
    // receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    const body = req.body;
    let data = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'));
    let id =  {id: data.length + 1};
    let note = {
      ...id,
      ...body
    }
    data.push(note);
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(data)); 
    return res.json(data);
  });
app.delete("/api/notes/:id", (req, res) => {
    // Should receive a query parameter containing the id of a note to delete.
    const deleteNoteId = parseInt(req.params.id);
    const data = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'));
    const newData = data.filter(notes => notes.id !== deleteNoteId);
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(newData)); 
    return res.json("Deleted");
  });





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });