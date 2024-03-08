'use client'

import { FaSearch } from "react-icons/fa"

export const SearchBar = () => {
  return <>
    <div className="w-3/4 max-w-[700px] flex gap-2 p-1 pr-3 bg-gray-900 rounded-2xl items-center justify-center" >
      <input 
        type="text" 
        placeholder="Buscar..." 
        className=" w-full bg-black rounded-2xl p-2 focus:outline-none"
      />
      <span className="cursor-pointer">
        <FaSearch onClick={() => console.log("Search")}/>
      </span>
    </div>
  </>
}