import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5001";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [modal, setModal] = useState(false);

  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzEzNDE4ODE0YzZiOWNjOTQ3ZTEyIn0sImlhdCI6MTY3NzkyMzEzN30.LmUlWRh34LW5cGdJtP2Euc1iI9F5l_dfKfcIu-tZp8Q",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzEzNDE4ODE0YzZiOWNjOTQ3ZTEyIn0sImlhdCI6MTY3NzkyMzEzN30.LmUlWRh34LW5cGdJtP2Euc1iI9F5l_dfKfcIu-tZp8Q",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();

    setNotes((prev) => {
      return [...prev, note];
    });
  };

  const deleteNote = async (noteId) => {
    const url = `${host}/api/notes/deletenote/${noteId}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzEzNDE4ODE0YzZiOWNjOTQ3ZTEyIn0sImlhdCI6MTY3NzkyMzEzN30.LmUlWRh34LW5cGdJtP2Euc1iI9F5l_dfKfcIu-tZp8Q",
      },
    });
    setNotes((prev) => {
      return prev.filter((note) => {
        return note._id !== noteId;
      });
    });
  };

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzEzNDE4ODE0YzZiOWNjOTQ3ZTEyIn0sImlhdCI6MTY3NzkyMzEzN30.LmUlWRh34LW5cGdJtP2Euc1iI9F5l_dfKfcIu-tZp8Q",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    getNotes();
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        getNotes,
        editNote,
        modal,
        setModal,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
