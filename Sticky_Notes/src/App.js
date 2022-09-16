import { useState, useEffect } from 'react';
import Header from './components/Header'
import Notes from './components/Notes'
import AddNote from './components/AddNote';

function App() {

  const [showAddNote, setShowAddNote] = useState(false)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const getNotes = async () => {
      const NotesFromServer = await fetchNotes()
      // console.log(NotesFromServer)  //// This should show db.json data on consol
      setNotes(NotesFromServer)
    }
    getNotes()
  }, [])

  // Fetch Data from db.json using (json-server)
  const fetchNotes = async () => {
    const response = await fetch("http://localhost:5000/notes") // fetch makes and API call to the local json-server
    const collectedData = await response.json()  //json format data is returned from the server via GET request

    return collectedData
  }

  // Fetch Note from Database (json) of a specific ID
  const fetchNote = async (specific_id) => {
    const response = await fetch(`http://localhost:5000/notes/${specific_id}`)  // API call for a specific id , like "notes/:id " in express
    const collectedData = await response.json()

    return collectedData
  }

  // Delete Note
  const deleteNote = async (fetchedID) => {

    await fetch(`http://localhost:5000/notes/${fetchedID}`, {
      method: "DELETE"
    })

    setNotes(notes.filter((note) => note.id !== fetchedID))
    // The filter function will return the id's to display on front that doesn't
    // have the value of the fetchID , means that if fetch ID = 1 , then filter
    // will display data which doesn't have ID = 1 so rest will be displayed
    // and it will act that it has been deleted on the Website!
  }

  // Toggle Reminder
  const toggleReminder = async (toggleID) => {
    // console.log(toggleID); //should print 1 , 2 , 3

    const noteToToggle = await fetchNote(toggleID)

    const updateNoteField = {
      ...noteToToggle,
      reminder: !noteToToggle.reminder
    }

    const response = await fetch(`http://localhost:5000/notes/${toggleID}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updateNoteField)
    })

    const data = await response.json()

    setNotes(notes.map(
      (note) => note.id === toggleID ? { ...note, reminder: data.reminder } : note
    )
    )
  }

  // Add Note
  const addNote = async (noteDetails) => {
    const response = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(noteDetails)
    })

    const newData = await response.json()

    console.log(newData)

    setNotes([newData, ...notes]) //Chaning the order, of Display on the User Interfacce

    // const id_num = Math.floor(Math.random() * 10000) + 1;
    // const newNote = { id_num, ...noteDetails }
    // setNotes([...notes, newNote])
  }

  return (
    <div className="container">
      <Header title={"Sticky Notes"}
        onAdd={() => setShowAddNote(!showAddNote)}
        toggle={showAddNote}
      />
      {showAddNote && <AddNote onAdd={addNote} />}
      {
        notes.length > 0 ? <Notes notes={notes}
          onDelete={deleteNote} onToggle={toggleReminder} />
          : <h3>Nothing to Show , Kindly make a new Note!</h3>
      }
    </div>
  );
}

export default App;
