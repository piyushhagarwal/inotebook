const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { findByIdAndUpdate } = require("../models/Notes");

//Route:1 Fetch all notes ,login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured while fetching notes");
  }
});

//Route:2 Add a note ,login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be of 3 characters").isLength({ min: 3 }),
    body("description", "Description must be of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //Destructuring eg. title = req.body.title

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = Note.create({
        user: req.user.id,
        title: title,
        description: description,
        tag: tag,
      });
      res.json(req.body);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured while creating a note");
    }
  }
);

//Route:3 Update an existing note (For updation we use put method)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //create new object
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update iNotebook
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //For checking if the note is being updated by the right user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured while updating note");
  }
});

//Route:4 Delete an existing note (For deletion we use delete method)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be updated and update iNotebook
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //For checking if the note is being deleted by the right user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({
      success: "Note has been deleted successfully",
      note: note,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured while updating note");
  }
});

module.exports = router;
