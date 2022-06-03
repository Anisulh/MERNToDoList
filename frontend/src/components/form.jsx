
import { useEffect, useRef, useState } from "react"
import { GrFormClose } from 'react-icons/gr';
import { AiOutlineEnter } from 'react-icons/ai'


export default function Form (props) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [read, setRead] = useState(false);
  const [cross, setCross] = useState('')
  const [submit, setSubmit] = useState();
  const [isSelected, setIsSelected] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const outSideClick = e => {
      if(isSelected && ref.current & !ref.current.contains(e.target)){
        setIsSelected(false)
      } else{
        setIsSelected(true)
      }
    }
    document.body.addEventListener('mousedown', outSideClick)
    console.log(isSelected)
    return () => {
      document.body.removeEventListener('mousedown', outSideClick)
    }
  }, [isSelected])
  

  function handleName(e){
    setName(e.target.value)
  }
  function handleDate(e){
    setDate(e.target.value)
  }
  function handleTitle(e){
    setTitle(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    !name || !date ? alert('Please fill out all the fields'): props.addTask(title, name, date)
    setName('')
    setDate('')
  }
  function handleTitleSubmit(e){
    e.preventDefault()
    !title ? alert('Please give this list a name'): props.addTitle(title)
    setRead(true)
    setSubmit()
  }
  function change(){
    setIsSelected(true);

    if (read){
      setCross(<button type="reset" className = "title-delete" onClick={newTitle}><GrFormClose /></button>)
    } else{
      setCross('')
      setSubmit(<button type="submit" onClick={console.log('helo')}> <AiOutlineEnter/></button>)
    }
  }
  function newTitle (){
    setTitle('');
    setCross('');
    setRead(false)
  }
   

  return(
    <>
    <form onSubmit={handleTitleSubmit}>
      <div className="todoTitle">
      <input 
        ref={ref}
        type="text" 
        className = "inputTitle" 
        placeholder="Name of List"
        value={title}
        onChange={handleTitle}
        readOnly= {read}
        onClick= {change}
      />
      {cross}
      {submit}
      </div>
    </form>
    <form onSubmit={handleSubmit} className="todoContainer">
      
   <div className="task">
    <input 
        type="date" 
        name="enter-date" 
        id="enter-date" 
        value={date}
        onChange={handleDate}
      />
      <input 
        type="text" 
        name = "todo" 
        placeholder="Add a task"
        value= {name}
        onChange={handleName}
      />
      <button type="submit" className="btn"> Add todo</button>
    </div>
 </form>
 </>
  )
}