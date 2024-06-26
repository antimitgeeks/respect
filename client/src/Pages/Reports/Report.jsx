import React, { useEffect, useState } from 'react'
import { useAllNpoListQuery } from '../../services/NpoService';
// import { BsEye } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { IoWarningOutline } from 'react-icons/io5';
import { BiBadgeCheck } from "react-icons/bi";
import { BiBadge } from "react-icons/bi";
// import { Tooltip } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


function Report() {

  const navigate = useNavigate();



  const [loading, setLoading] = useState('');
  const [allNposData, setAllNposData] = useState([])

  const { data: ListData, isLoading: ListLoading, isFetching: listFetching, } = useAllNpoListQuery(
    {
      offset: 0,
    }
  );

  useEffect(() => {
    if (ListLoading || listFetching) {
      setLoading(true);
    }

    else {
      setLoading(false);
      setAllNposData(ListData?.result?.rows)

    }

  }, [ListLoading, ListData, listFetching])

  const handleDetailClick = (id) => {
    navigate(`details/${id}`)
  }

  return (
    <div className=' w-full h-full overflow-y-scroll py-2 px-3 flex flex-col gap-5'>
      <span className=' mx-auto text-[24px] font-semibold'>NPOS Report</span>
      {
        allNposData?.length <= 0 || !allNposData ?
          <div className=' py-3 mt-1 w-full flex items-center justify-center'>
            <span className=' w-full border py-[7px]  justify-center flex gap-3 items-center'>No Data Found <IoWarningOutline size={19} /></span>
          </div>
          :
          <div className=' w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 py-2 gap-x-0 gap-y-4'>
            {
              loading ?
                <>
                  {Array(8).fill(0).map((itm) => {
                    return <div className=' bg-slate-200 shadow-sm border animate-pulse h-48 w-[80%]'> </div>
                  })}
                </>
                :
                allNposData?.map((itm, indx) => {
                  return <div key={indx} className={` overflow-hidden relative shadow-md border p-1 flex flex-col justify-center items-center gap-3 px-1 py-2 w-[92%] bg-slate-50 rounded-md `}>
                    {/* <img src={itm.img} className=' border object-cover p-1 rounded-lg object-center w-full h-[180px]' alt="" /> */}

                    <div className='flex w-fit  items-center gap-1 absolute top-1 right-1' >
                      <Tooltip arrow TransitionComponent={Zoom} title={`${itm?.isActive?"Active":"InActive"}`} placement='top'>
                        {
                          itm?.isActive ?
                            <span className='  text-green-600'>
                              {/* <Tooltip arrow title="gg" placement='top'> */}

                                <BiBadgeCheck size={24} />
                              {/* </Tooltip> */}
                            </span>
                            :
                            <span className=' text-red-600'>

                              <BiBadge size={24} />
                            </span>
                        }
                        {/* <span className=' hover:block hidden'>Active</span> */}
                        {/* <div class="relative group">
                        <span class="hidden hover:block">Active</span>
                        </div> */}
                        {/* <p className="hover:text-green-600  text-transparent "> Active</p> */}
                      </Tooltip>
                    </div>

                    <div className=' w-full gap-3 pt-4 text-sm sm:text-[17px] flex flex-col '>
                      <div className=' w-full flex gap-4 px-2 items-center justify-start '>
                        <span className=' font-semibold pl-1 '><FaUser/>  </span>
                        <span className=' px-0'>{itm.name ? itm.name : "N/A"}</span>
                      </div>
                      <div className=' w-full flex  px-2 items-center justify-start gap-4 '>
                        <span className=' font-semibold pl-1'><MdOutlineEmail/>  </span>
                        <span>{itm.email ? itm?.email : "N/A"}</span>
                      </div>
                      <div className=' mb-2 w-full px-2 flex justify-start items-center gap-4 '>
                        <span className=' font-semibold pl-1'><FaPhoneAlt/>  </span>
                        <span>{itm.number ? itm?.number : "N/A"}</span>
                      </div>
                      <hr />
                      <div onClick={(e) => handleDetailClick(itm?.id)} className=' hover:opacity-80 py-[6px] rounded mt-2 flex w-full cursor-pointer items-center justify-center bg-[#f49a86]'>
                        <IoMdEye size={22} />
                      </div>
                    </div>
                  </div>
                })
            }
          </div>
      }
    </div>
  )
}

export default Report