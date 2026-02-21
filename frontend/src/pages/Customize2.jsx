import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/userContext'

const Customize2 = () => {
    const {userData}=useContext(userDataContext)
    const [assistantName,setAssistantName]=useState(userData?.AssistantName|| "")
  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]'>
      <h1 className='text-white mb-[20px] text-[30px] text-center'>Enter Your <span className='text-blue-200'>Assistant Name</span></h1>
       <input type="text" placeholder='eg. Sora' className="w-full max-w-[600px] h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px] " required onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/>
       {assistantName && <button className='min-w-[300px] h-13.75 mt-5 text-black font-semibold cursor-pointer bg-white rounded-full text-[18px]' onClick={()=>navigate("/customize2")}>Finally Create Your Assistant</button>}
    </div>
  )
}

export default Customize2
