import React, { useState, useEffect } from 'react'
import { useGetSingleNpoQuery } from '../../../services/NpoService';
import { useGetPageByIdQuery } from '../../../services/NpoPageService';
import { useNavigate } from 'react-router-dom';

function NpoView() {

  const [listData, setListData] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0)
  const [NpoData, setNpoData] = useState()
  const [showDetails, setShowDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [npoDetails, setNpoDetails] = useState(null);
  const navigate = useNavigate()
  const Id = 8
  const { data: singleData, isFetching: isdataFetching, isLoading: isdataLoading } = useGetSingleNpoQuery({ Id })

  const { data: NpoPagedata, error, isFetching, isLoading } = useGetPageByIdQuery(
    { Id: NpoData?.id },
    { skip: !showDetails } // Only fetch when showDetails is true
  );

  const toggleDetails = () => {
    console.log(NpoPagedata, '-------------------------NpoPagedata');
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    if (isdataLoading || isdataFetching) {
      setLoading(true)
    }
    else {
      setNpoData(singleData?.result);
      setTimeout(() => {
        setLoading(false)
      }, 500);
    }

  }, [singleData, isdataLoading, isdataFetching])

  return (
    <>

      <div className=' flex flex-col gap-2 pt-2  '>
        {
          loading ?
            <div className=' w-full flex flex-col gap-2 mt-10'>
              <div className=' border h-[300px] rounded w-full bg-slate-400 animate-pulse'></div>
            </div>
            :
            <div className="container  mx-auto p-4">
              <div  className=" float-end mb-3 cursor-pointer bg-slate-300 px-3 py-[5px] rounded w-fit" onClick={()=>navigate('/dashboard')}>
                Back
              </div>
              {
                NpoData?
                <>
                  <h1 className="text-3xl font-bold mb-4">{NpoData?.name} Details</h1>
              <div className="bg-white rounded-lg p-6">
                <p className="text-[19px] mb-2"><strong>Name:</strong> {NpoData?.name}</p>
                <p className="text-[19px] mb-2"><strong>Email:</strong> {NpoData?.email}</p>
                <p className="text-[19px]"><strong>Number:</strong> {NpoData?.number}</p>
              </div>
              <button
                onClick={toggleDetails}
                className="text-blue-500 underline mt-4 inline-block"
              >
                {showDetails ? 'Hide NPO Page Details' : 'View NPO Page Details'}
              </button>
              {showDetails && (
                <div className="mt-4">
                  {detailsLoading ? (
                    <div className='w-full flex flex-col gap-2 mt-10'>
                      <div className='border h-[300px] rounded w-full bg-slate-400 animate-pulse'></div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-6">
                      {/* <h2 className="text-2xl font-bold mb-4">{npoDetails?.name} Full Details</h2>
                      <p className="text-lg mb-2"><strong>Name:</strong> {npoDetails?.name}</p>
                      <p className="text-lg mb-2"><strong>Email:</strong> {npoDetails?.email}</p>
                      <p className="text-lg"><strong>Number:</strong> {npoDetails?.number}</p> */}
                      {/* Add other details as needed */}
                    </div>
                  )}
                </div>
              )}
                </>
                :
                <div className=' font-semibold w-full flex justify-center'>
                No Data Available
                </div>
              }
            
            </div>
        }
      </div>
    </>
  );
}

export default NpoView;