import React from 'react'
import { Link } from 'react-router-dom';

const Modal = () => {
    return (
        <div className="w-full h-[100%] flex justify-center items-center">
            <div className="w-[30%] h-[60%] flex flex-col items-center justify-center bg-red-500 text-white">
                <h2 className="w-40% text-center font-bold text-[2rem] mb-2">Reset Email Sent</h2>

                <p className='text-center font-semibold text-[1rem] w-[60%] text-slate-300 mb-3'>We have just sent an email with a password reset link to email@gmail.com</p>


                <input type="text" name="" value="" onChange="" className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter Email' />

                <div>
                    <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500 text-slate-300 font-bold'>Got it</button>
                    <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500 text-slate-300 font-bold'>Send Again</button>
                </div>

                <Link to="/login" className="text-red-500 text-[0.6rem]">Back to login</Link>

            </div>
        </div>
    )
}

export default Modal

