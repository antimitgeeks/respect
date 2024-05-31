import React, { useState } from 'react'
import { toast } from 'react-toastify';

function VideoModal(
    {
        close,
        onchange
    }

   
) {

    const [videoData,setVideoData]= useState('');

    const handleSave=()=>
        {
            if(!videoData || videoData?.trim()?.length<=0)
                {
                    toast.error("Field cannot be empty");
                }
            else
            {
                close(videoData)
            }
        }
    

    return (
        <div className=' flex flex-col gap-8 py-2  w-full'>
            <div className='relative flex w-full justify-between'>
                <div className=' text-lg'>
                    VideoModal
                </div>
                <div className='absolute right-[-24px] flex items-center justify-center py-1 px-[11.5px] text-white bg-red-400 hover:opacity-75  bottom-6 cursor-pointer ' onClick={() => close()}>
                    X
                </div>
            </div>
            <div className=' flex gap-5 items-center justify-between'>
                <input placeholder='Enter video URL' type="text" className=' w-full px-2 py-2 border outline-none' onChange={(e)=>setVideoData(e.target.value)} />
                <span onClick={()=>handleSave()} className=' bg-slate-300 py-2 px-4 cursor-pointer'>Save</span>
            </div>
        </div>
    )
}

export default VideoModal