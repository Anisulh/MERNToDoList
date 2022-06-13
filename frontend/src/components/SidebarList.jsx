
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Listform from './Listform';
import { getLists, listReset } from '../features/lists/listSlice';
import ListItem from './ListItem';
import { useDrop } from 'react-dnd';

export default function SidebarList (){
  const [basket, setBasket] = useState([])
  const dispatch = useDispatch()
  const{lists, isError, message}= useSelector((state)=> state.lists)
  const [{ isOver }, dropRef] = useDrop({
    accept: 'task',
    drop: (item) => setBasket((basket) => 
                        !basket.includes(item) ? [...basket, item] : basket),
    collect: (monitor) => ({
        isOver: !!monitor.isOver()
    })
})
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    
  }, [isError, message]);

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
    <div className="sidebar">
      
      <div className='sortButtons'>
      <button>Today</button>
      <button>This Week</button>
      <button>This Month</button>
      </div>
      <div className='list-section'>
      <p> Lists</p>
      <Listform/>
      {lists.length > 0 ? (
          <ul>
            {list} 
          </ul>) : (<h3> You do not have any tasks</h3>)}
      </div>
      
    </div>
  )
}