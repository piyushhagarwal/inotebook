import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: 1,
      title: "jello",
      tag: "general",
      description: "byee",
    },
    {
      _id: 2,
      title: "jello",
      tag: "general",
      description: "byee",
    },
    {
      _id: 3,
      title: "jello",
      tag: "general",
      description: "byee",
    },
    {
      _id: 4,
      title: "jello",
      tag: "general",
      description: "byee",
    },
    {
      _id: 5,
      title: "jello",
      tag: "general",
      description: "byee",
    },
    {
      _id: 6,
      title: "jello",
      tag: "general",
      description: "byee",
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
