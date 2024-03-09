"use client"

import { Dispatch, ReactNode, SetStateAction } from "react"
import { FaXmark } from "react-icons/fa6"

type PropTypes = {
  children: ReactNode,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const Modal = ({ children, open, setOpen }: PropTypes) => {
  return <>
    <div className={`w-full h-screen fixed top-0 left-0 bg-black bg-opacity-80 p-5 z-10 ${open ? 'flex' : 'hidden'} justify-center items-center`}>
      <div className="max-md:w-full w-[400px] max-lg:h-auto bg-gray-900 rounded-md p-4 flex flex-col items-center gap-5">
        <div className="w-full flex justify-end">
          <FaXmark 
            className="h-6 w-6 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  </>
}