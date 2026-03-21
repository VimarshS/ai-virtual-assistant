import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
// import { set } from 'mongoose'

const Home = () => {
  const {userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext)
  const navigate= useNavigate()
  const [listening,setListening]=useState(false)
  const isSpeakingRef=useRef(false)
  const recognitionRef=useRef(null)
  const synth=window.speechSynthesis

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
  const speak=(text)=>{
    const utterance=new SpeechSynthesisUtterance(text);//converts the text in such a way that it can be spoken by the browser
    isSpeakingRef.current=true;
    utterance.onend=()=>{
      isSpeakingRef.current=false;
      recognitionRef.current?.start()//after speaking the response we will start the voice recognition again to listen to the user command
    }
    synth.speak(utterance)
  }

 const handleCommand=(data)=>{
  const {type,userInput,response}=data;
  if(type=== 'google-search'){
    const query=encodeURIComponent(userInput);
    window.open(`https://www.google.com/search?q=${query}`,"_blank")//blank is used to open the link in new tab
  }
  if(type==='calculator-open'){
    window.open(`https://www.google.com/search?q=calculator`,"_blank")
 }
 if(type==='instagram-open'){
    window.open(`https://www.instagram.com`,"_blank")
 }
 if(type==='facebook-open'){
    window.open(`https://www.facebook.com`,"_blank")
 }
 if(type ==="weather-show"){
  window.open(`https://www.google.com/search?q=weather`,"_blank")
 }
 if(type ==="youtube-search" || type==="youtube-play"){
  const query=encodeURIComponent(userInput);
  window.open(`https://www.youtube.com/results?search_query=${query}`,"_blank")
 }
}

  useEffect(()=>{
    //converting te user input speech into text using web speech api and sending that text to the backend to get response from gemini and then we will read that response using speech synthesis api
      const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition//webspeech api is builtin api in javascript and it has two versions one is SpeechRecognition and other is webkitSpeechRecognition and we are checking if any of them is available in the browser and using it for voice recognition

      const recognition=new SpeechRecognition();//converting the SpeechRecognition interface into an object so that we can use it for voice recognition
      recognition.continuous=true;
      recognition.lang="en-US"

      recognitionRef.current=recognition

      const isRecognizingRef={current:false}

      const safeRecognition=()=>{
        if(!isSpeakingRef.current && !isRecognizingRef.current){
           try {
            recognition.start()
            console.log("Recognition requested to start")
           } catch (error) {
            if(error.name !== "InvalidStateError"){
              console.log("Start error :",error);
           }
        }
      }
    };
    recognition.onstart=()=>{
      console.log("Voice recognition started");
      isRecognizingRef.current=true;
      setListening(true);
    }
    recognition.onend=()=>{
      console.log("Voice recognition ended");
      isRecognizingRef.current=false;
      setListening(false);
    
    if(!isSpeakingRef.current){
      setTimeout(()=>{
        safeRecognition()
      },1000);  //delay avoids rapid loop
    }
  };
  recognition.onerror=(event)=>{
    console.warn("Voice recognition error",event.error);
    isRecognizingRef.current=false;
    setListening(false);
    if(event.error !== "aborted" && !isSpeakingRef.current){
      setTimeout(()=>{
        safeRecognition()
      },1000);
    }
  }
  

      recognition.onresult=async (e)=>{
        
        const transcript=e.results[e.results.length-1][0].transcript.trim();
        console.log("heard :" + transcript)
      if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){

        recognition.stop()
        isRecognizingRef.current=false;
        setListening(false);
         const data=await getGeminiResponse(transcript)
        //  console.log("Gemini response:", data);
         handleCommand(data)
      }
    }
   const fallback=setInterval(()=>{
    if(!isSpeakingRef.current && !isRecognizingRef.current){
      safeRecognition()
    }
   },10000)
   safeRecognition()
   return ()=>{
    recognition.stop()
    setListening(false)
    isRecognizingRef.current=false;
    clearInterval(fallback)
   }
    
  },[])
  
      
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
