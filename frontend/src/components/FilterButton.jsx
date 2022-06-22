import { MdToday, MdLocalFireDepartment, MdOutlineUpcoming }from 'react-icons/md'

export default function FilterButton(props) {
  
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">{props.name === 'All' ? <MdOutlineUpcoming/>: props.name ==='Priority' ? <MdLocalFireDepartment/> : <MdToday/>} </span>
      <span>{props.name}</span>
    </button>
  );
}
