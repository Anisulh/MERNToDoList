import { useEffect } from "react";
import Form from "../components/form";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getTasks, reset} from '../features/task/taskSlice'
import TaskItem from '../components/TaskItem'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import SidebarList from "../components/SidebarList";

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
    key={task._id}
    id={task._id}
    name={task.name}
    date={task.date}
    completed={task.completed}
    //toggleComplete={toggleComplete}
    
  />

));



  return (
    <DndProvider backend= {HTML5Backend}>
      <div className="App">
      <Header />
      <div className="list-page-body">
        <SidebarList/>
        <div className="list-area">
          <Form  />
          {tasks.length > 0 ? (
          <ul>
            {taskList} 
          </ul>) : (<h3> You do not have any tasks</h3>)}
        </div>
        
      </div>
      
      </div>
    </DndProvider>
    
  );
}

export default List;
