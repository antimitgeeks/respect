import React, { useState, useEffect } from 'react'
import { useGetSingleNpoQuery } from '../../../services/NpoService';
import { useGetPageByIdQuery } from '../../../services/NpoPageService';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import NpoPreview from '../NpoPagePreview/NpoPreview';

function NpoView() {

  const [listData, setListData] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0)
  const [NpoData, setNpoData] = useState()
  const [showDetails, setShowDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [npoDetails, setNpoDetails] = useState(null);
  const navigate = useNavigate();
  const [UserId, setUserId] = useState('')
  const data = useParams();

  useEffect(() => {
    setUserId(data?.id);
    console.log(data?.id)
  }, [data])


  const { data: singleData, isFetching: isdataFetching, isLoading: isdataLoading } = useGetSingleNpoQuery({ Id: UserId })
  
  // const { data: NpoPagedata, error, isFetching, isLoading } = useGetPageByIdQuery(
  //   { Id: NpoData?.id },
  //   { skip: !showDetails } // Only fetch when showDetails is true
  // );

  const toggleDetails = () => {
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
      }, 300);
    }

  }, [singleData, isdataLoading, isdataFetching])

  return (
    <>
      <div className=' h-full overflow-y-scroll flex flex-col gap-2 pt-2  '>
        {
          loading ?
            <div className=' w-full flex flex-col gap-2 mt-10'>
              <div className=' border h-[300px] rounded w-full bg-slate-400 animate-pulse'></div>
            </div>
            :
            <div className="container  mx-auto p-4">
              <div className=" float-end mb-3 cursor-pointer bg-slate-300 px-3 py-[5px] rounded w-fit" onClick={() => navigate('/dashboard')}>
                Back
              </div>
              {
                NpoData ?
                  <>
                    <h1 className="text-2xl font-bold mb-4">{NpoData?.name} Details</h1>
                    <div className="bg-white rounded-lg p-6">
                      <p className="text-[19px] mb-2"><strong>Name:</strong> {NpoData?.name ||  "N/A"}</p>
                      <p className="text-[19px] mb-2"><strong>Email:</strong> {NpoData?.email || "N/A"}</p>
                      <p className="text-[19px]"><strong>Number:</strong> {NpoData?.number || "N/A"}</p>
                    </div>
                    <button
                      onClick={toggleDetails}
                      className="text-blue-500 underline mt-4 inline-block"
                    >
                      {showDetails ? 'Hide NPO Page ' : 'View NPO Page '}
                    </button>
                    {showDetails && (
                      <div className="mt-4">
                        {detailsLoading ? (
                          <div className='w-full flex flex-col gap-2 mt-10'>
                            <div className='border h-[300px] rounded w-full bg-slate-400 animate-pulse'></div>
                          </div>
                        ) : (
                          <div className=' flex w-full gap-2 flex-col'>
                            <span className=' capitalize'>
                              <span className=' font-semibold mr-2'>Page name </span>
                              :  {NpoData?.name || "N/A"}
                            </span>
                            {/* <span> <span className=' font-semibold mr-8'>Page no </span>: {NpoData?.id}</span> */}
                            <div className="bg-white border-2 w-full rounded-lg p-1 sm:p-6">
                              <NpoPreview Id={UserId} />
                            </div>
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