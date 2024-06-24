import React, { useEffect, useState } from 'react'
import { useAllNpoListQuery } from '../../services/NpoService';
// import { BsEye } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { IoWarningOutline } from 'react-icons/io5';

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
      <span className=' mx-auto text-[24px] font-semibold'>Npo Details</span>
      {
        allNposData?.length <= 0 || !allNposData ?
          <div className=' py-3 mt-1 w-full flex items-center justify-center'>
            <span className=' w-full border py-[7px]  justify-center flex gap-3 items-center'>No Data Found <IoWarningOutline size={19} /></span>
          </div>
          :
          <div className=' w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-2 gap-x-5 gap-y-4'>
            {
              loading?
              <>
              {Array(8).fill(0).map((itm)=>
              {
                return <div className=' bg-slate-200 shadow-sm border animate-pulse h-48 w-full'> </div>
              })}
              </>
              :
              allNposData?.map((itm, indx) => {
                return <div key={indx} className=' shadow-md border p-1 flex flex-col justify-center items-center gap-3 px-2 py-2 w-full bg-slate-50 rounded-md '>
                  {/* <img src={itm.img} className=' border object-cover p-1 rounded-lg object-center w-full h-[180px]' alt="" /> */}
                  <div className=' w-full gap-2 text-sm sm:text-[17px] flex flex-col '>
                    <div className=' w-full flex flex-col items-center justify-start gap-0 '>
                      <span className=' font-semibold'>Name  </span>
                      <span>{itm.name ? itm.name : "N/A"}</span>
                    </div>
                    <div className=' w-full flex flex-col items-center justify-start gap-0 '>
                      <span className=' font-semibold'>Email  </span>
                      <span>{itm.email ? itm?.email : "N/A"}</span>
                    </div>
                    <div className=' mb-2 w-full flex justify-start flex-col items-center gap-0 '>
                      <span className=' font-semibold'>Number  </span>
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