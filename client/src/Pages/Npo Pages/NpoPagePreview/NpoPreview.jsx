import React from 'react'
import { useSelector } from 'react-redux';

function NpoPreview() {

    const npoPageData= useSelector((state)=>state.NpoDataSlice.data);
    console.log(npoPageData)
  return (
    <div className=' flex flex-col gap-2   w-full h-full'>
        <div className=' relative w-full  '>
            <div className=' py-3 px-3 w-full absolute'>
                <img className=' w-[70px] h-[70px] rounded-full' src={npoPageData?.logoUrl} alt="" />
            </div>
            <div className=' w-full h-[550px]'>
               <img className=' object-cover object-center h-full w-full' src={npoPageData?.bannerUrl} alt="" />
            </div>
        </div>
        <div className=' w-full flex '>
            <div className=' w-1/2 h-[400px] px-3 py-1'>
                <img className=' h-full w-full object-cover' src={npoPageData?.imageTextUrl} alt="" />
            </div>
            <div className=' w-1/2 '>
                <span>Heading</span>
                <span>Body</span>
            </div>
        </div>
    </div>
  )
}

export default NpoPreview;