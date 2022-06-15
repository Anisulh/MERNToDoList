import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/task/taskSlice";
import { Draggable } from "react-beautiful-dnd";
import {FiEdit, FiTrash2, FiSave} from "react-icons/fi"
import {ImCancelCircle} from "react-icons/im"
import {MdOutlineDragIndicator} from 'react-icons/md'




export default function TaskItem (props) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const dispatch = useDispatch()
 
  

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
        <div className="task-item">
          <button className="hover-button btn"><MdOutlineDragIndicator/></button>
          <div className="task-area" >
             <div>
                {/* <input
                  id={props.id}
                  type="checkbox"
                  defaultChecked={props.completed}
                  onChange={() => props.toggleComplete(props.id)}
                /> */}
                <div className="task-top-section">
                <label>
                  {props.name}
                </label>
                <button
                  type="button"
                  className="btn btn__danger"
                  onClick={() => dispatch(deleteTask(props.id))}
                >
                  <FiTrash2/> 
                </button>
                </div>
                <div className="task-bottom-section">
                  <label>
                    {props.date}
                  </label>
                  <button type="button" className="btn" onClick={() => setEditing(true)}>
                    <FiEdit/> 
                  </button>
                </div>
             </div>
          </div>
        </div>
      )
  
  
return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) =>(
        <li 
          className="todo" 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? editingView : regularView}  
        </li>
      )}
    </Draggable>

  );

}