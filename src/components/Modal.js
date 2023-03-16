import React, { useContext } from "react";
import "./css/Modal.css";
import NoteContext from "../context/notes/NoteContext";

function Modal(props) {
  const context = useContext(NoteContext);
  const { setModal, editNote } = context;
  const { initialNote, setNote } = props;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const submitUpdatedNote = (e) => {
    e.preventDefault();
    editNote(
      initialNote._id,
      initialNote.title,
      initialNote.description,
      initialNote.tag
    );
    setModal(false);
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1>Edit note</h1>
          </div>
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              X
            </button>
          </div>
        </div>
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
              value={initialNote.title}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter Description"
              name="description"
              value={initialNote.description}
              onChange={handleOnChange}
              rows="3"
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
              value={initialNote.tag}
              onChange={handleOnChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitUpdatedNote}
          >
            Update note
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
