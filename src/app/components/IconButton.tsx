'use client'

import { ReactNode } from "react"

type PropTypes = {
  children: ReactNode,
  onClick: () => void
}

export const IconButton = ({ children, onClick }: PropTypes) => {
  return <>
    <button 
      onClick={onClick}
      className="bg-gray-900 rounded-full max-md:w-12 max-md:h-12 w-14 h-14 flex justify-center items-center border-none"
    >
      {children}
    </button>
  </>
}