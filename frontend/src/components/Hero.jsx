import { Link } from "react-router-dom";
import listpreview from '../images/listpreview.svg'




export default function Hero(){
  return (
    <article className="main">
      <div className="heroLeft">
        <h1>Welcome to TODO,</h1>
        <h2>A simpler way todo</h2>
        <h3>Lets get started:</h3>
        <h3>Login to make a new list!</h3>
        <section className="accounts">
          <Link to='/register' className="btn">Create an Account </Link>
          <p>or</p>
          <Link to='/login' className="btn">Log In</Link>
        </section>
        <p>Note: TODO saves lists locally, clearing history and browser storage will erase the list created.</p>
        <p>Create an account to ensure this doesn't happen</p>
      </div>
      
      <img src={listpreview} alt="list preview" width="798.52" height="487.09" />
    </article>
  )
}