import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/task/taskSlice";
import { useDrag, useDrop } from 'react-dnd'
import {FiEdit, FiTrash2, FiSave} from "react-icons/fi"
import {ImCancelCircle} from "react-icons/im"
import {MdOutlineDragIndicator} from 'react-icons/md'
import { useRef } from 'react'




export default function TaskItem (props) {

  const {id, index, moveTask} = props
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const dispatch = useDispatch()
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'task',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })




  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  drag(drop(ref))

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateTask({id: props.id, name}))
    setName("");
    setEditing(false);
  }
  const opacity = isDragging ? 0 : 1
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
      
        <li className="todo" style={{ opacity }} ref={ref} data-handler-id={handlerId}>
          {isEditing ? editingView : regularView}  
        </li>
      

  );

}