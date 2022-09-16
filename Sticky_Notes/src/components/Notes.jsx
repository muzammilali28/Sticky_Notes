import Note from "./Note"

const Notes = ({ notes, onDelete, onToggle }) => {

  return (
    <>
      {notes.map((n) => (
        <Note key={n.id}
          note={n}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  )
}

export default Notes