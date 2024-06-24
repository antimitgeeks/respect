import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DialogComponent from '../../components/DialogComponent';
import ReportModal from './ReportModal';
import { useGetReportByIdQuery } from '../../services/ReportService';
import { Pagination } from '@mui/material';
// import { Calendar, DateRangePicker } from 'react-date-range';
import { Calendar } from "react-multi-date-picker"
import { FaGalacticSenate } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function ReportDetail() {

    const id = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [selectedData, setSelectedData] = useState([]);
    const [ReportData, setReportData] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false)
    const [dateModal, setDateModal] = useState(false);
    const [dateValue, setDateValue] = useState('')
    const [tempdateValue, settempDateValue] = useState('');
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

 
    // states for paginatin 
    const [page, setPage] = useState(1);
    const dataPerPage = 6;
    const offset = (page - 1) * dataPerPage;
    // let count;
    const [count, setCount] = useState(0)
    const handlePagination = (ev, page) => {
        setPage(page)
    }


    const { data: ReportsData, isFetching: dataFetching, isLoading: dataLoading } = useGetReportByIdQuery({
        Id: id?.id, data: {
            limit: dataPerPage,
            offset: offset,
            startDate: startDate || "",
            endDate: endDate || ""

        }
    });

    useEffect(() => {
        if (dataFetching || dataLoading) {
            setLoading(true)
        }
        else {
            setCount(Math.ceil(ReportsData?.result?.records?.count / dataPerPage))
            setReportData(ReportsData?.result)
            setLoading(false)
        }
    }, [ReportsData, dataFetching, dataLoading])


    const handleModalClose = () => {
        setModalOpen(false)
    }

    const handleDetails = (dta) => {
        setModalOpen(true)
        setSelectedData(dta)
    }

    const handledateChange = (ev) => {
        settempDateValue(ev)
    }
    function formatDate(calendarObject) {
        if (calendarObject) {

            const month = calendarObject?.month?.number?.toString().padStart(2, '0'); // Ensure two digits for the month
            const day = calendarObject?.day?.toString().padStart(2, '0'); // Ensure two digits for the day
            const year = calendarObject?.year;

            // Regular format: YYYY-MM-DD
            const formattedDate = `${year}-${month}-${day}`;

            return formattedDate;
        }
    }

    const handleSave = () => {
        const startDate = formatDate(tempdateValue[0]);
        setStartDate(startDate);
        const endDate = formatDate(tempdateValue[1]);
        setEndDate(endDate || '');
        setDateValue(tempdateValue);
        setDateModal(false)
    }

    const handleClearAllFilter = () => {
        setStartDate('');
        setEndDate('');
        setDateValue('')
    }


    useEffect(() => {
        if (dataFetching || dataLoading) {
            setLoading(true)
        }
        else {
            setCount(Math.ceil(ReportsData?.result?.records?.count / dataPerPage))
            setReportData(ReportsData?.result)
            setLoading(false)
        }
    }, [ReportsData, dataFetching, dataLoading])



    function formatDate(calendarObject) {
        if (calendarObject) {

            const month = calendarObject?.month?.number?.toString().padStart(2, '0'); // Ensure two digits for the month
            const day = calendarObject?.day?.toString().padStart(2, '0'); // Ensure two digits for the day
            const year = calendarObject?.year;

            // Regular format: YYYY-MM-DD
            const formattedDate = `${year}-${month}-${day}`;

            return formattedDate;
        }
    }
    console.log(ReportData?.records)
  
    return (
        <>
            <div className=' h-[86vh] overflow-y-scroll px-3 py-3 gap-3 flex flex-col'>
                <div className='  w-full flex items-center justify-between'>
                    <span className='font-semibold text-lg'>Report details</span>
                    <div className=" float-end mb-3 cursor-pointer bg-slate-300 px-3 py-[5px] rounded w-fit" onClick={() => navigate('/dashboard/reports')}>
                        Back
                    </div>
                </div>
                <div className=' w-full flex-col text-sm sm:text-[15.5px] sm:flex-row flex mb-2 justify-between'>
                    <div className=' flex gap-3 items-center'>
                        <div onClick={() => setDateModal(true)} className=' flex gap-2 hover:opacity-85 w-fit  border-2 border-slate-400 px-2 py-1 rounded cursor-pointer mb-2'>
                            {/* Filters area */}
                            Select Date Range
                        </div>
                        {
                            dateValue && startDate && endDate &&
                            <span className=' text-[14px] relative flex items-center border mb-1 p-1'>
                                {dateValue && startDate + "    to     " + endDate}
                                <span onClick={() => { setDateValue(''); setStartDate(''); setEndDate('') }} className=' cursor-pointer absolute right-[-5px] top-[-10px]'>
                                    X
                                </span>
                            </span>
                        }
                    </div>
                    <div className=' flex gap-4 sm:gap-6'>
                        <div>
                            <span className=' font-semibold text-sm sm:text-lg cursor-default'>
                                Total Npo Amount : {ReportData?.totalAmount?.toFixed(3) || "N/A"}
                            </span>
                        </div>
                        <div onClick={() => handleClearAllFilter()} className=' sm:text-[15.5px] text-sm border-b h-fit w-fit p-0 m-0 cursor-pointer border-blue-600 hover:text-blue-600'>

                            Clear all filter
                        </div>
                    </div>
                </div>

                <DialogComponent open={dateModal} maxWidth={'sm'}>
                    <div className=' w-full flex-col flex'>
                        <div onClick={() => setDateModal(false)} className=' w-full flex justify-end '>
                            <span className=' p-1 px-2 bg-slate-300 cursor-pointer'>
                                X
                            </span>
                        </div>
                        <div className=' flex justify-center items-center'>
                            <Calendar className=' rounded' value={dateValue} range rangeHover onChange={handledateChange} />
                        </div>
                    </div>
                    <div className=' flex  w-full justify-center items-center py-2 mt-3'>
                        <div onClick={() => handleSave()} className=' w-full flex items-center justify-center hover:opacity-80 bg-slate-300 py-2 px-3 rounded cursor-pointer'>
                            Save
                        </div>
                    </div>
                </DialogComponent>
                <div className=' hidden md:flex flex-col gap-2 border-2'>
                    <div className=' py-2 text-[15.4px] bg-slate-300 flex px-2 justify-between'>
                        <div className=' uppercase w-4/5 flex items-center pl-3'>Order id</div>
                        <div className=' uppercase w-4/5 flex items-center'>Npo amount</div>
                        <div className=' uppercase w-4/5 flex items-center'>Order amount</div>
                        <div className=' uppercase w-3/4 flex items-center'>Order date</div>
                        <div className=' uppercase w-2/3 flex items-center'>Customer details</div>
                    </div>
                    {
                        loading ?
                            <>
                                <span className='flex mt-3 w-full items-center justify-center animate-spin py-1'>
                                    <AiOutlineLoading3Quarters size={17} />
                                </span>
                            </>
                            :
                            ReportData?.records?.rows?.length == 0   ?
                                <span className=' w-full flex  items-center justify-center  mt-1 py-1'>No data Found</span>
                                :
                                ReportData?.records?.rows?.map((itm,indx) => {
                                    return <div key={indx}>
                                        <div className=' flex border-b text-[15px] justify-between rounded py-2 px-1'>
                                            <div className=' w-4/5 pl-[14px] '>{itm?.order?.orderId || "N/A"}</div>
                                            <div className=' w-4/5 pl-3'>{itm?.amount?.toFixed(3) || "N/A"}</div>
                                            <div className=' w-4/5 pl-2 '>{itm?.order?.amount?.toFixed(3) || "N/A"}</div>
                                            <div className=' w-3/4 '>{itm?.order?.orderDate?.split('T')[0] || "N/A"}</div>
                                            <div className=' w-2/3 '> <span onClick={() => handleDetails(itm?.order)} className='border-b cursor-pointer hover:text-blue-600 border-b-blue-500 w-16 px-[3px]'>Details</span></div>
                                        </div>
                                    </div>
                                })
                    }

                </div>
                <div className=' flex md:hidden w-full flex-col gap-[10px] '>
                    {ReportData?.records?.rows?.map((itm,indx) => {
                        return <div key={indx}>
                            <div className=' bg-white border text-[14.5px] font-semibold  py-3 px-2'>
                                <div className=' uppercase w-4/5 flex items-center  pl-0'>Order id : <span className=' pl-5'>{itm?.order?.orderId || "N/A"}</span> </div>
                                <div className=' uppercase w-4/5 flex items-center'>Npo amount : <span className=' pl-4'>{itm?.amount?.toFixed(3) || "N/A"}</span> </div>
                                <div className=' uppercase w-4/5 flex items-center'>Order amount : <span className=' pl-3'>{itm?.order?.amount?.toFixed(3) || "N/A"}</span> </div>
                                <div className=' uppercase w-3/4 flex items-center'>Order date : <span className='pl-[30px]'>{itm?.order?.orderDate?.split('T')[0] || "N/A"}</span> </div>
                                <div className=' uppercase w-2/3 flex items-center'>Order details :  <span className='pl-3'>
                                    <div onClick={() => handleDetails(itm?.order)} className=' w-2/3 '> <span className='border-b cursor-pointer hover:text-blue-600 border-b-blue-500 w-16 px-[3px]'>Details</span></div>
                                </span> </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className=' w-full mt-2 flex justify-end'>

                    <Pagination
                        shape='rounded'
                        variant='outlined'
                        page={page}
                        count={count}
                        onChange={handlePagination}
                    />
                </div>
            </div>

            <DialogComponent maxWidth={'sm'} open={isModalOpen}>
                <ReportModal data={selectedData} close={handleModalClose} />
            </DialogComponent>
        </>
    )
}

export default ReportDetail;