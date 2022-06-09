import { useEffect, useState } from "react"
import Header from "../components/Header"
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const {email, password} = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //allows you to bring in pieces from authslice into other pages
  const {user, isError, isSuccess, message} = useSelector(state => state.auth)
  useEffect(() => {
    if (isError){
      toast.error(message)
    }
    //redirect when logged in
    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())

  }, [isError, isSuccess, user, message, navigate, dispatch])

  
  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
  }
const onSubmit = (e) => {
  e.preventDefault()
  
  const userData = {
    email,
    password
  }
  dispatch(login(userData))
}

  return(
      <>
        <div className="App">
          <Header/>
          <h1>Login</h1>
          <p> Welcome! Please login to your account</p>
        </div>
        <form onSubmit={onSubmit}>
          <input type="email" name="email" id="email" value={email} onChange={onChange} placeholder='something@email.com' required/>
          <input type="text" name="password" id="password" value={password} onChange={onChange} placeholder='Enter a Password'required />
          
          <button type="submit" className="btn">Submit</button>
        </form>
      
      </>
        

  )
}

export default Login