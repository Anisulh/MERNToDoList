import React, { useState } from "react";



export default function TodoItem (props) {
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
  
  const editingTemplate = (
    <form  onSubmit={handleSubmit}>
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
  const viewTemplate = (
    <div>
      <div >
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label>
            {props.name}
          </label>
        </div>
        <div>
          <button type="button" className="btn" onClick={() => setEditing(true)}>
            Edit <span >{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span >{props.name}</span>
          </button>
        </div>
    </div>
  );
  
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

}