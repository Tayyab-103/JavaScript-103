const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE:1 Get All the Notes using : GET "/api/notes/fecthallnotes" Login required
router.get("/fecthallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ");
  }
});
//ROUTE:2 Add a new Notes using : POST "/api/notes/addnote" Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description Must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error ");
    }
  }
);

//ROUTE:3 Updating an Existing Notes using : PUT "/api/notes/updatenote" Login required
//user update own notes not the others notes validation later
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a newNote object
    const newNote = {};
    //If "title a raha hy" is part of the requirement, then add the object above it.
    // If it's not coming, the user doesn't want to update.
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be Update and Delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    ); //mera note update ho jaye ga ya karny sy {new:true}

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ");
  }
});

//ROUTE:4 Delete an Existing Notes using : DELETE "/api/notes/deletenote" Login required
//user update own notes not the others notes validation later
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be Deleted and Delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ "Success:": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error ");
  }
});

module.exports = router;
