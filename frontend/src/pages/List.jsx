import { useState } from "react"
import Form from "../components/form"
import Header from "../components/Header"
import TodoItem from "../components/TaskItem"
import { nanoid } from "nanoid"
const DATA = [] //data stores the tasks in an array

function List() {
  
 const [tasks, setTasks] = useState(DATA)
  //match the id of task that has its complete property changed to the array and invert the complete property
 function toggleComplete(id){
     const updatedTasks = tasks.map(task => {
       if (id === task.id){
         return {...task, complete: !task.complete}
       } 
       return task
   })
     setTasks(updatedTasks)
  }
  //for each task in the array, create a component in this page
  const taskList = tasks.map(task => (
    <TodoItem 
      name= {task.name}
      date= {task.date}
      complete= {task.complete}
      id= {task.id}
      key= {task.id}
      toggleComplete= {toggleComplete}
      delete= {deleteTask}
      edit= {editTask}
    />
  ))
//adding a task
//name and date come from form.js
  function addTask(name, date){
    const newTask = {id:'task-'+nanoid(), name: name, date: date, complete: false}
    setTasks([...tasks, newTask])
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }
  
  //editing a task
  function editTask(id, newName){
    const editedTaskList = tasks.map(task => {
      if (id === task.id){
        return {...task, name: newName}
      } return task
    })
    setTasks(editedTaskList)
  }


  //tells how many tasks are remaining
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