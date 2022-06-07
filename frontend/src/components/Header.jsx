import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {logout, reset} from '../features/auth/authSlice'
//About needs to be updated

export default function Header () {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)


  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header>
      <Link to='/' className="heading">ToDo List</Link>
      <nav>
        <ul>
          <li>
            <Link to='/'> Home</Link>
          </li>
          <li>
            <Link to='/lists'>Create List</Link>
          </li>
          <li>
            <Link to='/'> About</Link> 
          </li>
          {user? <button className="btn" onClick={onLogout}>Logout</button> : (
          <>
            <li>
              <Link to='/login' > Login </Link> 
            </li>
            <li>
              <Link to='/register'> Register</Link> 
             </li>
          </>
            
          )}
          
        </ul>
      </nav>
    </header>
  )
}