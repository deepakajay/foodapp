import { motion } from 'framer-motion'
import React from 'react'
import { faseInOut } from '../animations'
import { FaCheck } from "../assets/icons"
import { BsExclamationTriangle } from 'react-icons/bs'

const Alert = ({type, message}) => {
  if(type === "success") {
    return (
      <motion.div {...faseInOut} className='fixed top-32 right-12 px-4 py-2 rounded-md backdrop-blur-md bg-emerald-300 shadow-md flex items-center gap-4 z-[100]'>
        <FaCheck className='text-xl text-emerald-700'></FaCheck>
        <p className='text-xl text-emerald-700'>{message}</p>
      </motion.div>
    )
  }
  
  if(type === "warning") {
    return (
      <motion.div {...faseInOut} className='fixed z-10 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-md bg-orange-300 shadow-md flex items-center gap-4'>
        <BsExclamationTriangle className='text-xl text-orange-700'></BsExclamationTriangle>
        <p className='text-xl text-orange-700'>{message}</p>
      </motion.div>
    )
  }
  if(type === "danger") {
    return (
      <motion.div {...faseInOut} className='fixed z-10 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-md bg-red-300 shadow-md flex items-center gap-4'>
        <BsExclamationTriangle className='text-xl text-red-700'></BsExclamationTriangle>
        <p className='text-xl text-red-700'>{message}</p>
      </motion.div>
    )
  }

  if(type === "info") {
    return (
      <motion.div {...faseInOut} className='fixed z-10 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-md bg-blue-300 shadow-md flex items-center gap-4'>
        <BsExclamationTriangle className='text-xl text-blue-700'></BsExclamationTriangle>
        <p className='text-xl text-blue-700'>{message}</p>
      </motion.div>
    )
  }
}

export default Alert