import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5001";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

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

    const note = {
      _id: "64034e25317f8389d884a60c",
      user: "640313418814c6b9cc947e12",
      title: title,
      description: description,
      tag: tag,
      date: "1677938213653",
      __v: 0,
    };
    setNotes((prev) => {
      return [...prev, note];
    });
  };

  const deleteNote = (noteId) => {
    setNotes((prev) => {
      return prev.filter((note) => {
        return note._id !== noteId;
      });
    });
  };

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzEzNDE4ODE0YzZiOWNjOTQ3ZTEyIn0sImlhdCI6MTY3NzkyMzEzN30.LmUlWRh34LW5cGdJtP2Euc1iI9F5l_dfKfcIu-tZp8Q",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
