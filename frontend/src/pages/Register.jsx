import { useState } from "react"
import Header from "../components/Header"
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../features/auth/authSlice'



function Register() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {firstName, lastName, email, password, confirmPassword} = formData

  const dispatch = useDispatch()
  const {user, isLoading, isSuccess, message} = useSelector(state => state.auth)
  
  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: [e.target.value]
    }))
  }
const onSubmit = (e) => {
  e.preventDefault()
  
  if(password !== confirmPassword){
    toast.error('Passwords do not match')
  } else {
    const userData = {
      firstName,
      lastName,
      email,
      password
    }
    dispatch(register(userData ))
  }

}

  return(
      <>
        <div className="App">
          <Header/>
          <h1>Register</h1>
          <p> Welcome! Please fill in the information below and create your account!</p>
        </div>
        <form onSubmit={onSubmit} className='form'>
          <div className="form-name">
            <input type="text" name="firstName" id="firstName" value={firstName} onChange={onChange} placeholder='First Name' required/>
            <input type="text" name="lastName" id="lastName" value={lastName} onChange={onChange} placeholder='Last Name' required/>
          </div>
          <input type="email" name="email" id="email" value={email} onChange={onChange} placeholder='something@email.com' required/>
          <input type="text" name="password" id="password" value={password} onChange={onChange} placeholder='Enter a Password'required />
          <input type="text" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={onChange} placeholder='Please confirm your password' required/>
          <button type="submit" className="btn">Submit</button>
        </form>
      
      </>
        

  )
}

export default Register