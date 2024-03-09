"use client"

export const CardSkeleton = () => {
  return <>
    <div className="w-72 h-80 bg-white rounded-md p-4 animate-pulse flex flex-col gap-4">
      <div className=" w-full h-7 bg-slate-200 rounded-md animate-pulse"></div>
      <div className=" w-full h-4 bg-slate-200 rounded-md animate-pulse"></div>
      <div className=" w-full h-4 bg-slate-200 rounded-md animate-pulse"></div>
      <div className=" w-full h-4 bg-slate-200 rounded-md animate-pulse"></div>
      <div className=" w-full h-4 bg-slate-200 rounded-md animate-pulse"></div>
      <div className=" w-full h-4 bg-slate-200 rounded-md animate-pulse"></div>
    </div>
  </>
}