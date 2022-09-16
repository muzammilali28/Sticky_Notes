const express = require("express");
const app = express();
const notes = require("./NotesDB.json");

// file system module to perform file operations
// const fs = require('fs');
 
// // json data
// var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
 
// // parse json
// var jsonObj = JSON.parse(jsonData);
// console.log(jsonObj);
 
// // stringify JSON Object
// var jsonContent = JSON.stringify(jsonObj);
// console.log(jsonContent);
 
// fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
 
//     console.log("JSON file has been saved.");
// });


// const connectRouter = require("./routers/connection");
// app.use("/connectReact", connectRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// GET - Request for All Notes
app.get("/notes", (req, res) => {

    res.json(notes);
    console.log(notes);
});

// GET - Request for a specific ID
app.get("/notes/:id", (req, res) => {

    res.json(notes.filter(
        (note) => note.id === parseInt(req.params.id)
    ));
});

// POST - Request to Add a new Note
app.post("/notes", (req, res) => {

    const id_num = Math.floor(Math.random() * 10000) + 1;

    const newNote = {
        "id": id_num,
        "text": req.body.text,
        "day": req.body.day,
        "reminder": req.body.reminder
    }

    notes.push(newNote);
    
    res.json(notes);
});

// PUT - Request to Update Reminder Status of a specific ID
app.put("/notes/:id", (req, res) => {

    const found = notes.some((note) => note.id === parseInt(req.params.id));

    if (found) {
        notes.forEach(
            (note) => {
                if (note.id === parseInt(req.params.id)) {
                    
                    note.reminder = req.body.reminder;

                    res.json({"message" : "Note Updated", note , "All Data" : notes});
                }
            });
    }
});

// DELETE - Request to Delete a Note
app.delete("/notes/:id", (req, res) => {

    const found = notes.some((note) => note.id === parseInt(req.params.id));

    const leftData = notes.filter((note) => note.id !== parseInt(req.params.id));

    if (found)
    {
        res.json({"message" : "Deleted Member", "Remaing Data" : leftData});
    }

    // notes.push(leftData);
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server UP!! Listening at PORT ${PORT}`));
