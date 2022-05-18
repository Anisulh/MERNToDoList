import { useState } from "react"
import Header from "../components/Header"
import {toast} from 'react-toastify'
function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const {email, password} = formData
  
  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: [e.target.value]
    }))
  }
const onSubmit = (e) => {
  e.preventDefault()
  

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