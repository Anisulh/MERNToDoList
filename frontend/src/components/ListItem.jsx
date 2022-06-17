import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateList, deleteList } from "../features/lists/listSlice";
import {FiSave} from "react-icons/fi"
import {ImCancelCircle} from "react-icons/im"
import {MdKeyboardArrowRight} from 'react-icons/md'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from "react";


export default function ListItem (props) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {id, index, moveList} = props
  function handleClick (event) {
    setAnchorEl(event.currentTarget);
  };
  function handleClose(){
    setAnchorEl(null);
  };
  function handleDelete(){
    setAnchorEl(null);
    dispatch(deleteList(props.id))
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateList({id: props.id, name}))
    setName("");
    setEditing(false);
  }
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'list',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveList(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })




  const [{ isDragging }, drag] = useDrag({
    type: 'list',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  drag(drop(ref))
  const opacity = isDragging ? 0 : 1
  //created two different views depending on if the user clicks the edit button
  const editingView = (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          New name for {props.name}
        </label>
        <input id={props.id}  type="text" value={name} onChange= {e => setName(e.target.value)}/>
      </div>
      <div >
        <button type="button" className="btn" onClick={() => setEditing(false) }>
          <ImCancelCircle/>
          <span >renaming {props.name}</span>
        </button>
        <button type="submit" className="btn">
          <FiSave/>
          <span>new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const regularView = (
    <div className="list-item" >
      <button className="drop-down-button btn"><MdKeyboardArrowRight/></button>
      
      <div className="list-area">
      
            <div className="list-section-area">
            <label>
              {props.name}
            </label>
            <label >({props.taskNumber})</label>
             
            
            <div>
              <IconButton 
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                disableRipple= {true}
                size='small'
                sx={{
                  color: 'black',
                  marginLeft: '140px',
                }}
                
              >
                <MoreVertIcon fontSize="small"/>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{
                  border: 'none',
                  textShadow: 'none'
                }}
              >
                <MenuItem 
                  onClick={handleClose}
                  sx={{
                    fontFamily: 'Cutive Mono',
                    fontWeight: '700'
                  }}
                  >Edit</MenuItem>
                <MenuItem 
                  onClick={handleDelete}
                  sx={{
                    fontFamily: 'Cutive Mono',
                    fontWeight: '700'
                  }}
                  >Delete</MenuItem>
                
              </Menu>
            </div>
             {/* <button
              type="button"
              className="btn btn__danger"
              onClick={() => dispatch(deleteList(props.id))}
            >
              <FiTrash2/> 
            </button>
            </div>
            <div className="list-bottom-section">
              
              <button type="button" className="btn" onClick={() => setEditing(true)}>
                <FiEdit/> 
              </button>  */}
            </div>
      </div>
    </div>
    
  );
  
  return (<li className="todo" style={{ opacity }} ref={ref} data-handler-id={handlerId} >{isEditing ? editingView : regularView}  </li>);

}