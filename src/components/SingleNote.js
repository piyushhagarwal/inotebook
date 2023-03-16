import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import NoteContext from "../context/notes/NoteContext";

export default function SingleNote(props) {
  const context = useContext(NoteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;

  return (
    <div className="col-md-3 ">
      <div className="card  my-3 mx-1">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <FontAwesomeIcon
                id="icon"
                className="mx-2"
                icon={faTrash}
                onClick={() => {
                  deleteNote(note._id);
                }}
              />
              <FontAwesomeIcon
                id="icon"
                className="mx-2"
                icon={faPenToSquare}
                onClick={() => {
                  updateNote(note);
                }}
              />
            </div>
          </div>

          <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
