import React, { useState } from 'react'
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

const Signup = () => {

  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate();

  const loginNavigate = () => {
    navigate("/login")
  }

  const signUpInputHandler = (e) => {
    setSignUpInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    console.log("signUpInput", signUpInput)
  }

  return (
    <div className="w-full h-[100%] bg-gray-400 flex justify-center items-center">
      <div className="w-[62%] h-[80%] flex ">
        {/* Left part */}
        <div className="w-[50%] h-full bg-red-500 rounded-tl-md rounded-bl-md flex justify-center items-center flex-col text-slate-300">
          <h2 className="w-40% text-center font-bold text-[2rem]">Welcome Back!!</h2>
          <p className='text-center font-bold text-[0.9rem] w-[70%] m-4'>To keep connected with us please login with your Personal Info.</p>
          <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500  font-bold' onClick={loginNavigate}>SignIn</button>
        </div>

        {/* Right part */}
        <div className="w-[50%] h-full bg-white rounded-br-md text-black flex justify-center items-center flex-col">
          <h2 className="w-40% text-center font-bold text-[2rem]">Create Account</h2>

          <div className='flex justify-center items-center gap-2 my-3'>
            <div className='border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer' >
              <FaGoogle />
            </div>

            <div className='border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer' >
              <FaFacebookF />
            </div>
          </div>

          <p className='text-center font-semibold text-[1rem] w-[70%] text-gray-400'>or use your email for registration</p>


          <form className='flex flex-col justify-center items-center' onSubmit={signUpSubmitHandler}>
            <div className="px-4 mb-3">
              <div className="flex justify-between items-center gap-2">
                <input type="text" name="name" value={signUpInput.name} onChange={signUpInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter Name' required />

                <input type="email" name="email" value={signUpInput.email} onChange={signUpInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter Email' required />
              </div>

              <div className="flex justify-between items-center gap-2">
                <input type="password" name="password" value={signUpInput.password} onChange={signUpInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-2 rounded-sm border-none outline-none" placeholder='Enter Password' required />

                <input type="password" name="confirmPassword" value={signUpInput.confirmPassword} onChange={signUpInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-2 rounded-sm border-none outline-none" placeholder='Confirm Password' required />
              </div>
            </div>

            <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500 text-slate-300 font-bold'>SignUp</button>
          </form>


        </div>
      </div>
    </div>
  )
}

export default Signup
