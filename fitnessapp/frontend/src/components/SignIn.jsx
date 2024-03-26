import React, { useState } from 'react'
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate();

  const signupNavigate = () => {
    navigate("/signup")
  }

  const signInSubmitHandler = (e) => {
    e.preventDefault();
    console.log("signInInput", signInInput)
  }

  const signInInputHandler = (e) => {
    setSignInInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  return (
    <div className="w-full h-[100%] bg-gray-400 flex justify-center items-center">
      <div className="w-[62%] h-[80%] flex ">

        {/* Left part */}
        <div className="w-[50%] h-full bg-white rounded-br-md text-black flex justify-center items-center flex-col">
          <h2 className="w-40% text-center font-bold text-[2rem]">Sign in</h2>

          <div className='flex justify-center items-center gap-2 my-3'>
            <div className='border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer' >
              <FaGoogle />
            </div>

            <div className='border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer' >
              <FaFacebookF />
            </div>
          </div>

          <p className='text-center font-semibold text-[1rem] w-[70%] text-gray-400'>or use your account</p>


          <form onSubmit={signInSubmitHandler} className="flex flex-col justify-center items-center w-full">
            <input type="email" name="email" value={signInInput.email} onChange={signInInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter Email' required />

            <input type="password" name="password" value={signInInput.password} onChange={signInInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter Password' required />

            <input type="password" name="confirmPassword" value={signInInput.confirmPassword} onChange={signInInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter ConfirmPassword' required />

            <p className='text-center font-semibold text-[1rem] w-[70%] text-gray-400 mb-2'> <Link to="/forgot-password">Forgot Your Password ?</Link></p>

            <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500 text-slate-300 font-bold'>SignIn</button>
          </form>

        </div>

        {/* Right part */}
        <div className="w-[50%] h-full bg-red-500 rounded-tl-md rounded-bl-md flex justify-center items-center flex-col text-slate-300">
          <h2 className="w-40% text-center font-bold text-[2rem]">Hello, Friend!</h2>
          <p className='text-center font-bold text-[0.9rem] w-[70%] m-4'>Enter your personal details an start your journey with us</p>
          <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500  font-bold' onClick={signupNavigate}>Signup</button>
        </div>

      </div>
    </div>
  )
}

export default SignIn
