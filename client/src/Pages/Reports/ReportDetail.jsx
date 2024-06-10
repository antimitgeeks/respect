import React from 'react'
import { useParams } from 'react-router-dom'

function ReportDetail() {

    const id = useParams();

    const demoArry = [
        { name: 'Demo 1' },
        { name: 'Demo 2' },
        { name: 'Demo 3' },
        { name: 'Demo 4' },
    ]


    return (
        <div className=' px-3 py-3 gap-5 flex flex-col'>
            <div className=' font-semibold text-lg'>Report details</div>
            <div className=' flex flex-col gap-2'>
                <div className=' rounded py-2 bg-slate-300 flex px-2 justify-between'>
                    <div className=' w-full flex items-center pl-3'>Head</div>
                    <div className=' w-full flex items-center'>Head</div>
                    <div className=' w-full flex items-center'>Head</div>
                    <div className=' w-3/4 flex items-center'>Head</div>
                </div>
                {
                    demoArry?.map((itm) => {
                        return <>
                            <div className=' flex border-b justify-between rounded py-2 px-1'>
                                <div className=' w-full pl-3 '>{itm?.name}</div>
                                <div className=' w-full '>Body</div>
                                <div className=' w-full '>Body</div>
                                <div className=' w-3/4 '>Body</div>
                            </div>
                        </>
                    })
                }


            </div>

        </div>
    )
}

export default ReportDetail