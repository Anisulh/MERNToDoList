import { useState } from "react"



export default function Form (props) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  function handleName(e){
    setName(e.target.value)
  }
  function handleDate(e){
    setDate(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    !name || !date ? alert('insert a task and date'): props.addTask(name, date)
    setName('')
    setDate('')
  }

  return(
    <form onSubmit={handleSubmit} className="todoContainer">
      <div className="todoTitle">
      <input 
        type="text" 
        className = "inputTitle" 
        placeholder="Name of Todo"
      />
      <input 
        type="date" 
        name="enter-date" 
        id="enter-date" 
        value={date}
        onChange={handleDate}

      />
    </div>
    <div className="task">
      <input 
        type="text" 
        name = "todo" 
        placeholder="Add a task"
        value= {name}
        onChange={handleName}
      />
      <button type="submit" className="btn"> Add todo</button>
    </div>
 </form>
  )
}