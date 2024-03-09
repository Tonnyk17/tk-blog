'use client'

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"

type PropTypes = {
  setFilters : Dispatch<SetStateAction<string>>
}

export const SearchBar = ({ setFilters }: PropTypes) => {
  const [search, setSearch] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  } 

  useEffect(() => {
    if(!search) setFilters(search)
  },[search])

  const handleSearch = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFilters(search)
  }

  return <>
    <form className="w-3/4 max-w-[700px] flex gap-2 p-1 pr-3 bg-gray-900 rounded-2xl items-center justify-center">
      <input 
        type="text" 
        placeholder="Buscar..." 
        onChange={handleChange}
        className=" w-full bg-black rounded-2xl p-2 focus:outline-none"
      />
      <button
        className="cursor-pointer"
        type="submit"
        onClick={handleSearch}
      >
        <FaSearch/>
      </button>
    </form>
  </>
}