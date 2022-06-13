import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateList, deleteList } from "../features/lists/listSlice";
import {FiEdit, FiTrash2, FiSave} from "react-icons/fi"
import {ImCancelCircle} from "react-icons/im"



export default function ListItem (props) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const dispatch = useDispatch()
  

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateList({id: props.id, name}))
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
          <span >renaming {props.name}</span>
        </button>
        <button type="submit" className="btn">
          <FiSave/>
          <span>new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const regularView = (
    <div className="task-item" >
      <div>
          
          <label>
            {props.name}
          </label>
        </div>
        <div>
          <button type="button" className="btn" onClick={() => setEditing(true)}>
            <FiEdit/> 
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => dispatch(deleteList(props.id))}
          >
            <FiTrash2/> 
          </button>
        </div>
        
    </div>
    
  );
  
  return (<li className="todo" >{isEditing ? editingView : regularView}  </li>);

}