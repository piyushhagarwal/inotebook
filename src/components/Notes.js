import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import SingleNote from "./SingleNote";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <div>
      <AddNote />
      <div className="container">
        <h2>Your notes</h2>
        <div className="row">
          {notes.map((note) => {
            return <SingleNote key={note._id} note={note} />;
          })}
        </div>
      </div>
    </div>
  );
}