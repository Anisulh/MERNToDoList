import { useState } from "react"
import Header from "../components/Header"
import TodoItem from "../components/TaskItem"

function List() {
  
  return(
    
        <div className="App">
          <Header/>
          <div className="todoContainer">
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
              value="2022-01-01" 
              placeholder="Enter Todays date"
            />
          </div>
          <div className="task">
            <input 
              type="text" 
              name = "todo" 
              placeholder="Add a task"
              value=''
            />
            <button type="submit" className="btn"> Add todo</button>
          </div>
          <div id="list">
  
            <ul  className="todoList">
  
            </ul>
          </div>
        </div>
        </div>

  )
}

export default List