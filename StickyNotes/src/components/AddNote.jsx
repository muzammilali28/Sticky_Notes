import { useState } from "react"

const AddNote = ({ onAdd }) => {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    
    const onSubmit = (event) => {
        
        event.preventDefault()

        if(!text){
            alert("Please Add Text")
            return
        }

        onAdd({ text, day, reminder });

        setText('')
        setDay('')
        setReminder(false)
    }
    

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Note</label>
            <input type="text" placeholder="Write Note" value={text}
            onChange={(event) => setText(event.target.value)}/>
        </div>
        <div className="form-control">
            <label>Date and Time</label>
            <input type="text" placeholder="Add Date and time" value={day}
            onChange={(event) => setDay(event.target.value)}/>
        </div>
        <div className="form-control-check">
            <label>Important</label>
            <input type="checkbox" value={reminder}
            onChange={(event) => setReminder(event.currentTarget.checked)}/>
            {/* <input type="checkbox" checked={reminder} value={reminder}
            onChange={(event) => setReminder(event.currentTarget.checked)}/> */}
        </div>
        <input className="btn btn-block" type="submit" value="Save Note"/>
    </form>
  )
}

export default AddNote