import { useContext, useState } from "react";
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: undefined});

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({ title: "", description: "", tag: undefined })
        props.showAlert("Note Added successfully", "success")
    }

    const handleOnChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add Note</h2>
            <form method="post" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleOnChange} value={note.title} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange} value={note.description} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleOnChange} value={note.tag} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default AddNote