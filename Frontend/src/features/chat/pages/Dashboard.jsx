import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/usechat';


const Dashboard = () => {

  const chat = useChat();
  useEffect(() => {
    chat.initilizeSocketConnection();
  }, []);
    const user = useSelector((state) => state.auth);
    console.log(user);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard