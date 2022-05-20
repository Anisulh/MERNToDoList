import {FaCheck} from 'react-icons/fa'


export default function TodoItem (props) {
  
  return (
    <div className="todo-item">
      <li> 
        <h6 className="item-name">{props.name}</h6>
      </li>
      <p className="todo-created-date">{props.date}</p>
      <button type="button" className="item-complete"><FaCheck/></button>
    </div>
  )
}