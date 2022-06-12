import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/task/taskSlice";
import { useDrag } from "react-dnd";




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
          Cancel
          <span >renaming {props.name}</span>
        </button>
        <button type="submit" className="btn">
          Save
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
            Edit <span >{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => dispatch(deleteTask(props.id))}
          >
            Delete <span >{props.name}</span>
          </button>
        </div>
        {isDragging}
    </div>
    
  );
  
  return (<li className="todo" >{isEditing ? editingView : regularView}  </li>);

}