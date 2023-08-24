import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote} = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login");
        }
    }, [])

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(note)
        editNote(note.id , note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated successfully", "success")
    }

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (

        <>
            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden >
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={handleOnChange} value={note.etitle} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={handleOnChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={handleOnChange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5} className="btn btn-primary" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'You do not have any notes. Add notes from above'}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                    })
                }
            </div>
        </>
    )
}

export default Notes