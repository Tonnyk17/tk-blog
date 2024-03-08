'use client'

import { FaPlus } from "react-icons/fa"

export const IconButton = () => {
  return <>
    <button 
      className=" bg-gray-900 rounded-full w-10 h-10 flex justify-center items-center border-none"
    >
      <FaPlus/>
    </button>
  </>
}