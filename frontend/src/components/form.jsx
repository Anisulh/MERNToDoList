import { useState } from "react";

import {MdOutlineLibraryAdd} from 'react-icons/md'

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTask } from "../features/task/taskSlice";
import Listform from '../components/Listform'
export default function Form(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    !name || !date ? toast.error("Please fill out all the fields"): dispatch(addTask({ name, date }));
    setName("");
    setDate("");
  }
  return (
    <>
      <Listform/>
      <form onSubmit={handleSubmit} className="todoContainer">
        <div className="task">
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <div className="input-with-button">
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
              <MdOutlineLibraryAdd/>
            </button>
          </div>
          
        </div>
      </form>
    </>
  );
}
