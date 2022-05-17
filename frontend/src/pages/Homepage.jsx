import Header from "../components/Header"
import Hero from "../components/Hero"

function Home() {
  return(
    
        <div className="App">
          <Header/>
          <div className='container'>
            <Hero />
            <img src='images\miniwindow.svg' alt='preview'/>
          </div>
        </div>

  )
}

export default Home