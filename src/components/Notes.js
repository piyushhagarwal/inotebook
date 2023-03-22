import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import SingleNote from "./SingleNote";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, modal, setModal } = context;
  const [note, setNote] = useState({
    title: "",
    describe: "",
    tag: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (localStorage.getItem("token")) {
        getNotes();
      } else {
        navigate("/login");
      }
    };
  }, []);

  const updateNote = (currentNote) => {
    setModal(true);
    setNote(currentNote);
  };

  return (
    <div>
      <AddNote />
      {modal && <Modal initialNote={note} setNote={setNote} />}
      <div className="container">
        <h2>Your notes</h2>
        <div className="row">
          {notes.map((note) => {
            return (
              <SingleNote key={note._id} note={note} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
