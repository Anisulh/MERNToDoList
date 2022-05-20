


export default function TodoItem (props) {
  
  return (
    <div className="todo-item">
      <li> 
        <h4 className="item-name">{props.name}</h4>
      </li>
      <p className="todo-created-date">{props.date}</p>
      <input id="todo-0" type="checkbox" defaultChecked={props.complete} />
      <button type="button" className="item-edit">Edit</button>
      <button type="button" className="item-delete">Delete</button>
      
    </div>
  )
}