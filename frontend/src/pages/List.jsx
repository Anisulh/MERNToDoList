import { useCallback, useEffect, useState } from "react";
import Form from "../components/form";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getTasks, reset, updateTask} from '../features/task/taskSlice'
import TaskItem from '../components/TaskItem'
import { getLists, listReset } from "../features/lists/listSlice";
import ListItem from "../components/ListItem";
import Listform from "../components/Listform";


import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FilterButton from "../components/FilterButton";


function List() {
const FILTER_MAP = {
  All: () => true,
  Priority: task => task.priority,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

  const [filter, setFilter] = useState('All');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const{tasks, isError, message}= useSelector((state)=> state.tasks)
  const{lists}= useSelector((state)=> state.lists)
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








useEffect(() => {
  dispatch(getLists());

  return () => dispatch(listReset());
}, [dispatch]);

//for each task in the array, create a component in this page
const [order, setOrder] = useState(tasks)
const [listOrder, setListOrder] = useState(lists)

useEffect(() =>{
  setOrder(tasks)
  setListOrder(lists)
}, [tasks, lists ])


const moveTask = useCallback((dragIndex, hoverIndex) => {
  setOrder((prevOrder) =>
    update(prevOrder, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevOrder[dragIndex]],
      ],
    }),
  )
}, [])
const moveList = useCallback((dragIndex, hoverIndex) => {
  setListOrder((prevListOrder) =>
    update(prevListOrder, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevListOrder[dragIndex]],
      ],
    }),
  )
}, [])
const renderTask = useCallback((task, index) => {
  return (
    <TaskItem
      index={index}
      key={task._id}
      id={task._id}
      name={task.name}
      date={task.date}
      completed={task.completed}
      priority={task.priority}
      moveTask = {moveTask}
    />
  )
}, [moveTask])
const renderList = useCallback((list, index) => {
  return (
    <ListItem
      index={index}
      key={list._id}
      id={list._id}
      name={list.name}
      moveList={moveList}
    >
    </ListItem>
)
}, [moveList])
const filterList = FILTER_NAMES.map(name => (
  <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
      <Header />
      <div className="list-page-body">
        <div className="sidebar">
          <div className='sortButtons'>
            {filterList}
            {/* <button className="btn"><MdToday/> Today</button>
            <button className="btn"><MdLocalFireDepartment/> Priority</button>
            <button className="btn"><MdOutlineUpcoming/> Upcoming</button> */}
        </div>
        <div className='list-section' >
          <p> Lists</p>
          <Listform/>
          {lists.length > 0 ? (
              <ul>
                {listOrder.map((list, i) => renderList(list, i))}
              </ul>
            ) : null}
        </div>
        
        </div>
        <div className="task-input-area">
          <Form  />
          
          <ul>
            {order.filter(FILTER_MAP[filter]).map((task, i) => renderTask(task, i))}
          </ul>
        </div>
        
      </div>
      
      </div>
    </DndProvider>
      
  
    
  );
}

export default List;
