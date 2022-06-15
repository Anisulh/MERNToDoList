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


export default function ListItem (props) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(props.name);
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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
  
  return (<li className="todo" >{isEditing ? editingView : regularView}  </li>);

}