import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "general",
  });

  const submitNote = (e) => {
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "general",
    });
    e.preventDefault();
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div className="container px-5 my-3">
        <h1>Add a note</h1>
        <form className="my-3 ">
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
              name="title"
              value={note.title}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter Description"
              name="description"
              value={note.description}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="description">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              placeholder="Enter Tag"
              name="tag"
              value={note.tag}
              onChange={handleOnChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitNote}
          >
            Add note
          </button>
        </form>
      </div>
    </div>
  );
}
