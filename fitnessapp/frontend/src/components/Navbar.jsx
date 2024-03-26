import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <ul className='flex gap-2'>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Signin</Link></li>
        <li><Link to="/change-password">ChnagePassword</Link></li>
        <li><Link to="/forgot-password">Forgot Password</Link></li>
        <li><Link to="/otp-verification">OtpVerification</Link></li>
    </ul>
  )
}

export default Navbar
