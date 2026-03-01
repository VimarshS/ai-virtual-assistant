import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const {userData,serverUrl,setUserData}=useContext(userDataContext)
  const navigate= useNavigate()

  const handleLogout=async()=>{
    try {
      const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      setUserData(null)
      navigate("/signin")
      
    } catch (error) {
      setUserData(null)
      console.log(error);
    }

  }
  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[15px]'>
      <button className='min-w-37.5 h-13.75 mt-5 text-black font-semibold bg-white absolute top-[20px] right-[20px] rounded-full cursor-pointer text-[18px]' onClick={handleLogout}>Log Out</button>

      <button className='min-w-37.5 h-13.75 mt-5 text-black font-semibold bg-white absolute top-[100px] right-[20px] rounded-full cursor-pointer text-[18px] px-[20px] py-[10px]'onClick={()=>navigate("/customize")}>Customize your Assistant</button>
      
      <div className='w-[250px] h-[350px] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg'>
        <img src={userData?.assistantImage} alt="" className='h-full object-cover'/>

      </div>
      <h1 className='text-white text-[18px] font-semibold'>I'm {userData?.assistantName}</h1>
    </div>
  )
}

export default Home
