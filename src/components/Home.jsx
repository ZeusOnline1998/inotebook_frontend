import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Notes from './Notes'
import AddNote from './AddNote';

const Home = (props) => {


  return (
    <div>
      <AddNote showAlert={props.showAlert} />
      <Notes showAlert={props.showAlert} />
    </div>
  )
}

export default Home
