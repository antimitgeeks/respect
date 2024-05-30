import React from 'react'

function DataTable(props) {

    const { Heading, Body } = props

    return (
        <div className=' w-full h-full flex flex-col gap-2 '>
            <div className=' flex w-full  rounded  bg-slate-200 p-2 gap-1 justify-between'>
                {
                    Heading?.map((itm,indx) => {
                        return <div key={indx}className=' w-full flex-wrap'>
                            <span>{itm}</span>
                        </div>
                    })
                }
            </div>
            {/* <hr /> */}
            <div className=' w-full flex flex-col justify-between gap-3 p-2'>
                {
                    Body?.map((itm,index) => {
                        return <div key={index} className=' w-full flex items-center justify-center  '>
                            {

                                Object.values(itm)?.map((itm,idx) => {
                                    return <div key={idx} className=' w-full'>
                                        <span>
                                            {itm?itm:'N/A'}
                                        </span>
                                        <hr />
                                    </div>
                                }) 
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default DataTable;