import { Link } from "react-router-dom";





export default function Hero(){
  return (
    <article className="main">
      <h1>Welcome to TODO,</h1>
      <h2>A simpler way todo</h2>
      <h3>Lets get started:</h3>
      <h3>Click the + to make a new list!</h3>
      <section class="accounts">
        <Link to='/register' className="btn">Create an Account </Link>
        <p>or</p>
        <Link to='/login' className="btn">Log In</Link>
      </section>
      <p>Note: TODO saves lists locally, clearing history and browser storage will erase the list created.</p>
      <p>Create an account to ensure this doesn't happen</p>
    </article>
  )
}