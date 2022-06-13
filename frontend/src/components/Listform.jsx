import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {createList} from '../features/lists/listSlice'

export default function Listform() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    !name ? toast.error("Please fill out all the fields"): dispatch(createList({ name }));
    setName("");
  }
  

  return (
    <>
     
      <form onSubmit={handleSubmit} className="todoContainer">
        <div className="task">
    
          <input
            type="text"
            name="todo"
            placeholder="Add a task"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            Create List
          </button>
        </div>
      </form>
    </>
  );
}
