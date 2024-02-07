import React from 'react'
import back from "../../../assets/icons/leftArrowIcon.svg"

const PreviewHeader = ({handleEdit = ()=> {}, handlePublish= ()=> {}}) => {
  return (
    <div className='flex justify-between items-center pl-12 pr-10 py-8'>
        {/* left */}
        <div className='flex items-center gap-x-8'>
            <div className='flex gap-x-2 items-center'>
              <img src={back} alt="" />
            <div className='text-slate-600 font-medium'>Back</div>  
            </div>
            
            <div>
          <span className="text-zinc-800 text-2xl font-semibold font-['Hind Guntur'] md:text-4xl">
            Preview{" "}
          </span>
          <span className="text-red-700 text-2xl font-semibold font-['Hind Guntur'] md:text-4xl">
            Profile
          </span>
        </div>
        </div>

        {/* right */}
        <div className='flex items-center gap-x-8'>
        <div className="w-[183px] h-[45px] bg-[#CB000E] flex flex-row justify-center items-center rounded-[25px] text-white text-xl font-semibold"
        onClick={handlePublish}>
               Publish 
        </div>

        <div className="w-[183px] h-[45px] bg-transparent border border-red-700 flex flex-row justify-center items-center rounded-[25px] text-red-700 text-xl font-semibold"
        onClick={handleEdit}>
            Edit
        </div>
        </div>

    </div>
  )
}

export default PreviewHeader