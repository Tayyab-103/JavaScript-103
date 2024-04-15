import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);

  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const ref = useRef(null);
  // const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    setIsModalOpen(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    console.log("Updating the new Note", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    setIsModalOpen(false);
    e.preventDefault();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      <button
        // ref={ref}
        type="button"
        className="btn btn-primary d-none"
        // data-toggle="modal"
        // data-target="#exampleModal"
        onClick={() => setIsModalOpen(true)}
      >
        Launch demo modal
      </button>
      {isModalOpen && (
        <div
          className="modal show"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          // aria-labelledby="exampleModalLabel"
          // aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      value={note.etitle}
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      value={note.edescription}
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      value={note.etag}
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  // ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container row my-3">
        <h2>Your Notes</h2>

        <div className="container">
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
