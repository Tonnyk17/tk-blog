"use client"

import { ReactNode } from "react"
import { FaXmark } from "react-icons/fa6"

type PropTypes = {
  children: ReactNode
}

export const Modal = ({ children }: PropTypes) => {
  return <>
    <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-30 p-5 z-10 flex justify-center items-center">
      <div className="max-md:w-full w-1/2 max-lg:h-auto bg-gray-900 rounded-md p-4 flex flex-col items-center gap-5">
        <div className="w-full flex justify-end">
          <FaXmark className="h-6 w-6 cursor-pointer"/>
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  </>
}