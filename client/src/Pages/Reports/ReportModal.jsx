import React from 'react'

function ReportModal(
    {
        data,
        close
    }
) {
    console.log(data);

    const Data = JSON.parse(data?.customerDetails)
    console.log(Data);

    return (
        <div className=' w-full flex gap-4 flex-col'>
            <div className=' relative w-full flex justify-between'>
                <span className=' text-lg font-semibold'>Order Details</span>
                <span onClick={() => close()} className=' top-[-20px] absolute items-center justify-center right-[-24px] hover:opacity-80 bg-red-400 text-white cursor-pointer py-[5px] px-[14px] '>X</span>
            </div>
            <hr />
            <div className=' px-1 py-2  flex gap-6'>
                <div className=' w-1/2 border-r-2 px-0 pr-4 border-slate-300 font-semibold flex flex-col gap-1'>
                    <span>
                        Customer id
                    </span>
                    <span>
                        Full name
                    </span>
                    <span>
                        Country
                    </span>
                    <span>
                        State
                    </span>
                    <span>
                        City
                    </span>
                    <span>
                        Email
                    </span>
                    <span>
                        Currency
                    </span>
                    <span>
                        Order date
                    </span>
                </div>
                <div className=' w-full  pl-2 flex flex-col gap-1'>
                    <span>
                        {Data?.default_address?.customer_id || "N/A"}
                    </span>
                    <span>
                        {Data?.default_address?.name || "N/A"}
                    </span>
                    <span>
                        {Data?.default_address?.country_name || "N/A"}
                    </span>
                    <span>
                        {Data?.default_address?.province || "N/A"}
                    </span>
                    <span>
                        {Data?.default_address?.city || "N/A"}
                    </span>
                   
                    <span>
                        {Data?.email || "N/A"}
                    </span>
                    <span>
                        {Data?.currency || "N/A"}
                    </span>
                    <span>
                        {data?.orderDate?.split('T')[0] || "N/A"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ReportModal;