import { useEffect } from "react";
import Form from "../components/form";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getTasks, reset} from '../features/task/taskSlice'


function List() {
  

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const{ isError, message}= useSelector((state)=> state.tasks)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
  }, [isError, message, user, navigate]);

  useEffect(() => {
    dispatch(getTasks());

    return () => dispatch(reset());
  }, [dispatch]);




  return (
    <div className="App">
      <Header />
      <Form  />
      

    </div>
  );
}

export default List;
