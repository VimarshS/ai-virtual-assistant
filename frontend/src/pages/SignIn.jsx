 import React, { useContext, useState } from 'react'
 import bg from "../assets/authBg.png"
 import { IoEye } from "react-icons/io5";
 import { IoEyeOff } from "react-icons/io5";
  import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios';

  const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {serverUrl}=useContext(userDataContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading ,setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [err,setErr]=useState("");

    const handleSignIn =async(e)=>{
        e.preventDefault();
        setErr("");
        setLoading(true)
       try {
        let result = await axios.post(`${serverUrl}/api/auth/signin`,{email,password
        },{withCredentials:true});
        console.log(result);
        setLoading(false)
       } catch (error) {
        console.log(error);
        setLoading(false)
        setErr(error.response.data.message)
       }
    }
   return (
     <div className='w-full h-screen bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}}>

        <form className='w-[90%] h-125 max-w-100 bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-4.5 px-4.5' onSubmit={handleSignIn}>
            <h1 className='text-white text-[29px] font-semibold mb-5'>Sign In to 
                 <span className='text-blue-400'> Virtual Assistant</span></h1>
                 <input type="email" placeholder="Email" className="w-full h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px] " required value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <div className='w-full h-15 border-2 border-white bg-transparent text-white rounded-full text-[18px] relative '>
            <input type={showPassword ? "text" : "password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-5 py-2.5' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {showPassword && <IoEye className='absolute top-4.5 right-5 w-6.25 h-6.25 text-[white] cursor-pointer' onClick={()=>setShowPassword(false)}/>}
                 {!showPassword && <IoEyeOff className='absolute top-4.5 right-5 w-6.25 h-6.25 text-[white] cursor-pointer' onClick={()=>setShowPassword(true)}/>}
        </div>
        {err.length>0 && <p className='text-red-500 text-[17px]'>
          *{err}
          </p>}
        <button className='min-w-37.5 h-13.75 mt-5 text-black font-semibold bg-white rounded-full text-[18px]' disabled={loading}>{loading?"Loading...":"Sign In"}</button>
        <p className='text-[white] text-[18px] cursor-pointer' onClick={()=>navigate("/signup")}>Want to create a new account ? <span className='text-blue-400'>Sign Up</span></p>

        </form>
       
     </div>
   )
 }
 
 export default SignIn
 