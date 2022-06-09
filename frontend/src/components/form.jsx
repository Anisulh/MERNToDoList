import { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineEnter } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTask } from "../features/task/taskSlice";

export default function Form(props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [read, setRead] = useState(false);
  const [cross, setCross] = useState("");
  const [submit, setSubmit] = useState();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    !name || !date ? toast.error("Please fill out all the fields"): dispatch(addTask({ name, date }));
    setName("");
    setDate("");
  }
  function handleTitleSubmit(e) {
    e.preventDefault();
    !title
      ? toast.error("Please give this list a name")
      : props.addTitle(title);
    setRead(true);
    setSubmit();
  }
  function change() {
    if (read) {
      setCross(
        <button type="reset" className="title-delete" onClick={newTitle}>
          <GrFormClose />
        </button>
      );
    } else {
      setCross("");
      setSubmit(
        <button type="submit" >
          {" "}
          <AiOutlineEnter />
        </button>
      );
    }
  }
  function newTitle() {
    setTitle("");
    setCross("");
    setRead(false);
  }

  return (
    <>
      <form onSubmit={handleTitleSubmit}>
        <div className="todoTitle">
          <input
            type="text"
            className="inputTitle"
            placeholder="Name of List"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            readOnly={read}
            onClick={change}
          />
          {cross}
          {submit}
        </div>
      </form>
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
            {" "}
            Add todo
          </button>
        </div>
      </form>
    </>
  );
}
