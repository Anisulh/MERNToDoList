import { Link } from "react-router-dom";

//About needs to be updated


export default function Header () {
  return (
    <header>
      <h1 className="heading">ToDo List</h1>
      <nav>
        <ul>
          <li>
            <Link to='/'> Home</Link>
          </li>
          <li>
            <Link to='/list'>List</Link>
          </li>
          <li>
            <Link to='/'> About</Link> 
          </li>
        </ul>
      </nav>
    </header>
  )
}