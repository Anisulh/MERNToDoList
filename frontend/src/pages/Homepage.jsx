import { Link } from "react-router-dom"
import Header from "../components/Header"
import Hero from "../components/Hero"
import {HiPlus} from 'react-icons/hi'

function Home() {
  return(
    
        <div className="App">
          <Header/>
          <div className='container'>
            <Hero />
            <img src='images\miniwindow.svg' alt='preview'/>
            <Link to='/list-todo'>
              <HiPlus/>
            </Link>
          </div>
        </div>

  )
}

export default Home