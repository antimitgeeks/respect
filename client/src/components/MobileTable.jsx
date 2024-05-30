import React from 'react'

function MobileTabel(props) {

    const { Heading, Body } = props

    return (
        <div className=' w-full h-full flex flex-col gap-2 '>
            {/* <div className=' flex w-full  rounded sm:flex-wrap  md:flex-nowrap bg-slate-200 p-2 gap-1 justify-between'>
                {
                    Heading?.map((itm,indx) => {
                        return <div key={indx}className=' w-full flex-wrap'>
                            <span>{itm}</span>
                        </div>
                    })
                }
            </div> */}
            {/* <hr /> */}
            <div className=' w-full flex flex-col justify-between gap-3 p-2'>
                {
                    Body?.map((itm, index) => {
                        return <div key={index}>
                            {
                                <div className=' flex w-full  rounded  gap-8 bg-slate-200 p-2  justify-between'>
                                    <div className=' flex flex-col '>

                                    {
                                        Heading?.map((itm, indx) => {
                                            return <div key={indx} className=' flex-wrap w-full '>
                                                <span>{itm}</span>
                                            </div>
                                        })
                                    }
                                    </div>
                                    <div className=' w-full flex-col flex '>

                                    {
                                        
                                        Object.values(itm)?.map((itm, idx) => {
                                            return <div key={idx} className=' flex-wrap w-full'>
                                                <span>
                                                    {itm ? itm : 'N/A'}
                                                </span>

                                                <hr />
                                            </div>
                                        })
                                    }
                                    </div>
                                </div>
                            }
                          
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default MobileTabel;