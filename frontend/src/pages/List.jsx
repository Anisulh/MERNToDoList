import { useState } from "react"
import Form from "../components/form"
import Header from "../components/Header"
import TodoItem from "../components/TaskItem"
import { nanoid } from "nanoid"

function List() {
  const DATA = []
  const [tasks, setTasks] = useState(DATA)
  const taskList = tasks.map(task => (
    <TodoItem 
      name= {task.name}
      date= {task.date}
      complete= {task.complete}
      id= {task.id}
      key= {task.id}
    />
  ))

  function addTask(name, date){
    const newTask = {id:'task-'+nanoid(), name: name, date: date, complete: false}
    setTasks([...tasks, newTask])
  }
  const taskNoun = taskList.length > 1 ? 'tasks' : 'task';
  const taskLeft = `You have ${taskList.length} ${taskNoun} remaining`;

  return(
    
        <div className="App">
          <Header/>
          <Form addTask={addTask}/>
          {taskLeft}
          <ul> 
            {taskList}
          </ul>
        </div>

  )
}

export default List