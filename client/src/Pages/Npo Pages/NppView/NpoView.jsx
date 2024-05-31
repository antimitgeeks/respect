import React, { useState, useEffect } from 'react'
import { useAllNpoListQuery } from '../../../services/NpoService';

function NpoView() {

  const [listData, setListData] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0)



  const { data: ListData, isLoading: isListLoading, isFetching: isListFetching } = useAllNpoListQuery({
    limit: 10,
    offset: 1
  }) //

  console.log(ListData, isListLoading, isListFetching, '-------------------api data');
  const npo = {
    name: "AIM",
    email: "contact@aim.org",
    number: "123-456-7890"
  };

  useEffect(() => {
    if (isListLoading || isListFetching) {
      setLoading(true)
    }
    else {
      setListData(ListData?.result?.rows);
      setCount(Math.ceil(ListData?.result?.count / 5) || 0)
      setTimeout(() => {

        setLoading(false)
      }, 500);
    }

  }, [ListData, isListFetching, isListLoading])

  return (
    <>

      <div className=' flex flex-col gap-2 pt-2  '>
        {
          loading ?
            <div className=' w-full flex flex-col gap-2'>
              {Array(5).fill(0).map((itm, indx) => {
                return <div key={indx} className=' border h-[60px] rounded w-full bg-slate-400 animate-pulse'></div>
              })}
            </div>
            :
            listData?.length <= 0 || !listData ?
              "No data" :
              <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{npo.name} Details</h1>
                <div className="bg-white rounded-lg p-6">
                  <p className="text-lg mb-2"><strong>Name:</strong> {npo.name}</p>
                  <p className="text-lg mb-2"><strong>Email:</strong> {npo.email}</p>
                  <p className="text-lg"><strong>Number:</strong> {npo.number}</p>
                </div>
              </div>
        }
      </div>
    </>
  );

}

export default NpoView;