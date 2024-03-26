import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Modal from './Modal';

const ForgotPassword = () => {

  const [forgotEmailInput, setForgotEmailInput] = useState({ email: "" });
  const [showModal, setShowModal] = useState(false)

  const forgotInputHandler = (e) => {
    setForgotEmailInput(
      [e.target.name] = e.target.value
    )
  }

  const forgotSubmitHandler = (e) => {
    e.preventDefault();
    console.log("forgotEmailInput", forgotEmailInput);

    setShowModal(!showModal);
  }

  return (
    <div className="w-full h-[100%] bg-gray-400 flex justify-center items-center relative">
      <div className="w-[45%] h-[60%] flex flex-col items-center justify-center bg-red-500 text-white">
        <h2 className="w-40% text-center font-bold text-[2rem] mb-2">Forgot Password</h2>

        <p className='text-center font-semibold text-[1rem] w-[70%] text-slate-300 mb-3'>enter your email and we will send you instructions to reset your Password.</p>

        {
          showModal && (<div className="absolute top-0 left-0 bg-gray-300"><Modal /></div>)
        }

        <form onClick={forgotSubmitHandler} className="flex flex-col items-center justify-center w-[90%]">
          <input type="text" name="email" value={forgotEmailInput.email} onChange={forgotInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter Email' required />

          <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500 text-slate-300 font-bold' >Send Mail</button>
        </form>
        <Link to="/login" className="text-slate-300 text-[0.88rem] mt-3"><p>Back to login</p></Link>

      </div>
    </div>
  )
}

export default ForgotPassword

