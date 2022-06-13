import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/task/taskSlice";
import { useDrag } from "react-dnd";
import {FiEdit, FiTrash2, FiSave} from "react-icons/fi"
import {ImCancelCircle} from "react-icons/im"




export default function TaskItem (props) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const dispatch = useDispatch()
  const [{isDragging}, drag] = useDrag(() =>({
    type: 'task',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateTask({id: props.id, name}))
    setName("");
    setEditing(false);
  }
  //created two different views depending on if the user clicks the edit button
  const editingView = (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          New name for {props.name}
        </label>
        <input id={props.id}  type="text" value={name} onChange= {e => setName(e.target.value)}/>
      </div>
      <div >
        <button type="button" className="btn" onClick={() => setEditing(false)}>
          <ImCancelCircle/>
        </button>
        <button type="submit" className="btn">
          <FiSave/>
          <span>new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const regularView = (
    <div className="task-item" ref={drag} >
      <div>
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleComplete(props.id)}
          />
          <label>
            {props.name}
          </label>
          <label>
            {props.date}
          </label>
        </div>
        <div>
          <button type="button" className="btn" onClick={() => setEditing(true)}>
            <FiEdit/> 
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => dispatch(deleteTask(props.id))}
          >
            <FiTrash2/> 
          </button>
        </div>
        {isDragging}
    </div>
    
  );
  
  return (<li className="todo" >{isEditing ? editingView : regularView}  </li>);

}