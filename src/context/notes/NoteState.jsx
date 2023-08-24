import NoteContext from './noteContext';
import React, { useState } from 'react';


const NoteState = (props) => {
    const host = import.meta.env.VITE_SERVER_URL
    const notesInitial = []
    const token = localStorage.getItem('token')

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "auth-token": token
            }
        });
        // setNotes(response.json());
        const json = await response.json();
        // console.log(json);
        setNotes(json);
    }


    // Add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify(title, description, tag)
        });
        // const json = await response.json();
        // setNotes(notes.concat(json));
        getNotes();
    }

    // Edit note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify({title, description, tag})
        });

        // const json = await response.json();
        // console.log(json)
        
        getNotes();
        
        // let newNotes = JSON.parse(JSON.stringify(notes));
        // for (let index = 0; index < newNotes.length; index++) {
        //     const element = newNotes[index];
        //     if (element._id == id) {
        //         newNotes[index].title = title;
        //         newNotes[index].description = description;
        //         newNotes[index].tag = tag;
        //         break;
        //     }
        // }
        // setNotes(newNotes);
        
    }

    // Delete note
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                "auth-token": token
            },
        });
        // const json = await response.json();
        // console.log(json);
        // console.log(`Deleting note with id: ${id}`)
        // const newNotes = notes.filter((note) => note._id !== id)
        // setNotes(newNotes)
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, getNotes, addNote, editNote, deleteNote }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;