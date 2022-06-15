import { useEffect } from "react";
import Form from "../components/form";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getTasks, reset} from '../features/task/taskSlice'
import TaskItem from '../components/TaskItem'
import { getLists, listReset } from "../features/lists/listSlice";
import ListItem from "../components/ListItem";
import Listform from "../components/Listform";
import { MdToday, MdLocalFireDepartment, MdOutlineUpcoming }from 'react-icons/md'

function List() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const{tasks, isError, message}= useSelector((state)=> state.tasks)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
  }, [isError, message, user, navigate]);

  useEffect(() => {
    dispatch(getTasks());

    return () => dispatch(reset());
  }, [dispatch]);

  //for each task in the array, create a component in this page
const taskList = tasks.map((task) => (
  <TaskItem
    draggable
    key={task._id}
    id={task._id}
    name={task.name}
    date={task.date}
    completed={task.completed}
    //toggleComplete={toggleComplete}
    
  />

));


const{lists}= useSelector((state)=> state.lists)

useEffect(() => {
  dispatch(getLists());

  return () => dispatch(listReset());
}, [dispatch]);

//for each task in the array, create a component in this page
const list = lists.map((list) => (
<ListItem
  key={list._id}
  id={list._id}
  name={list.name}

/>

));

  return (

      <div className="App">
      <Header />
      <div className="list-page-body">
        <div className="sidebar">
          <div className='sortButtons'>
            <button className="btn"><MdToday/> Today</button>
            <button className="btn"><MdLocalFireDepartment/> Priority</button>
            <button className="btn"><MdOutlineUpcoming/> Upcoming</button>
        </div>
        <div className='list-section' >
          <p> Lists</p>
          <Listform/>
          {lists.length > 0 ? (
            <ul>
              {list} 
            </ul>) : null}
        </div>
        
        </div>
        <div className="task-input-area">
          <Form  />
          {tasks.length > 0 ? (
          <ul>
            {taskList} 
          </ul>) : (<h3> You do not have any tasks</h3>)}
        </div>
        
      </div>
      
      </div>
  
    
  );
}

export default List;
