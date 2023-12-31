import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const context = useContext(noteContext);
    const {deleteNote} = context;

    const { note, updateNote } = props;
    return (
        <div className="col-lg-3 col-md-4">
            <div className="card mt-2">
                <div className="card-body">
                    <div className="d-flex ">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Deleted successfully", "success")}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">Category: {note.tag}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Noteitem