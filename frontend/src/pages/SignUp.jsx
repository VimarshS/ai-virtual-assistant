 import React, { useContext, useState } from 'react'
 import bg from "../assets/authBg.png"
 import { IoEye } from "react-icons/io5";
 import { IoEyeOff } from "react-icons/io5";
  import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios';

  const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {serverUrl}=useContext(userDataContext)
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading ,setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [err,setErr]=useState("");
    const handleSignUp =async(e)=>{
        e.preventDefault();
        setErr("");
        setLoading(true)
       try {
        let result = await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password
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
     <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}}>

        <form className='w-[90%] h-[500px] max-w-[400px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[18px] px-[18px]' onSubmit={handleSignUp}>
            <h1 className='text-white text-[29px] font-semibold mb-[20px]'>Register to 
                 <span className='text-blue-400'> Virtual Assistant</span></h1>
                 <input type="text" placeholder="Enter your name" className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px] " required value={name} onChange={(e)=>setName(e.target.value)}/>
                 <input type="email" placeholder="Email" className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px] " required value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative '>
            <input type={showPassword ? "text" : "password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {showPassword && <IoEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' onClick={()=>setShowPassword(false)}/>}
                 {!showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' onClick={()=>setShowPassword(true)}/>}
        </div>
        {err.length>0 && <p className='text-red-500 text=[17px]'>
          *{err}
          </p>}
        <button className='min-w-[150px] h-[55px] mt-[20px] text-black font-semibold bg-white rounded-full text-[18px]'>Sign Up</button>
        <p className='text-[white] text-[18px] cursor-pointer' onClick={()=>navigate("/signin")}>Already have an account ? <span className='text-blue-400'disabled={loading}>{loading?"Loading...":"Sign Up"}</span></p>

        </form>
       
     </div>
   )
 }
 
 export default SignUp
 