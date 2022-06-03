import { useState } from "react"
import Form from "../components/form"
import Header from "../components/Header"
import TaskItem from "../components/TaskItem"
import { nanoid } from "nanoid";
const DATA = [] //data stores the tasks in an array



function List(props) {
 const [tasks, setTasks] = useState(DATA);


  //match the id of task that has its complete property changed to the array and invert the complete property
 function toggleComplete(id){
     const updatedTasks = tasks.map(task => {
       if (id === task.id){
         return {...task, completed: !task.completed}
       } 
       return task
   })
     setTasks(updatedTasks)
  }
  //for each task in the array, create a component in this page
  const taskList = tasks.map(task => ( 
    <TaskItem
      id={task.id}
      name={task.name}
      date={task.date}
      completed={task.completed}
      key={task.id}
      toggleComplete={toggleComplete}
      delete={deleteTask}
      edit={editTask}
    />
  ));

//adding a task
//name and date come from form.js
  function addTask(title, name, date){
    const newTask = {id: title + nanoid(), name: name, date: date, completed: false}
    setTasks([...tasks, newTask])
  }
  //deleting task
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }
  
  //editing a task
  //id and newName come from TaskItem.jsx
  function editTask(id, newName){
    const editedTaskList = tasks.map(task => {
      if (id === task.id){
        return {...task, name: newName}
      } return task
    })
    setTasks(editedTaskList)
  }
 function listTitle (title){
   console.log(title)
 }

  //tells how many tasks are remaining
  const taskNoun = taskList.length > 1 ? 'tasks' : 'task';
  const taskLeft = `You have ${taskList.length} ${taskNoun} remaining`;

  return(
        <div className="App">
          <Header/>
          <Form addTask={addTask} addTitle= {listTitle}/>
          {taskLeft}

          <ul> 
            {taskList}
          </ul>
        </div>
  )
}

export default List