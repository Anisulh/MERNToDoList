import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {createList} from '../features/lists/listSlice'
import {MdPostAdd} from 'react-icons/md'
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
     
      <form onSubmit={handleSubmit} className="listContainer">
        <div className="list-input list-input-with-button">
          <input
            type="text"
            name="list"
            placeholder="Add a list"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button type="submit">
            <MdPostAdd/>
          </button>
        </div>
      </form>
    </>
  );
}
