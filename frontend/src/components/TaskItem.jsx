import React, { useState } from "react";



export default function TaskItem (props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  function handleChange(e) {
    setNewName(e.target.value);  
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.edit(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  //created two different views depending on if the user clicks the edit button
  const editingView = (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          New name for {props.name}
        </label>
        <input id={props.id}  type="text" value={newName} onChange={handleChange}/>
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
    <div>
      <div >
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
            onClick={() => props.delete(props.id)}
          >
            Delete <span >{props.name}</span>
          </button>
        </div>
    </div>
  );
  
  return <li className="todo">{isEditing ? editingView : regularView}</li>;

}