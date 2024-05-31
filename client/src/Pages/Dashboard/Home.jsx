import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import DataTable from '../../components/DataTable'
import MobileTabel from '../../components/MobileTable';
import DialogComponent from '../../components/DialogComponent'
import AddNgo from './AddNgo/AddNgo';
import { useAllNpoListQuery } from '../../services/NpoService';
import { AiFillDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import AlertComponent from '../../components/AlertComponent';
import InputComponent from '../../components/InputComponent';
import { FaSearch } from 'react-icons/fa';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditNgo from './EditNgo/EditNgo';
import Switch from '@mui/material/Switch';


function Home() {

  ////////// Dashboard top Cards Data ///////////
  const [isModalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [Page, setcurrentPage] = useState(1);
  const [count, setCount] = useState(0)
  const [actionIndex, setActionIndex] = useState([])
  const [selectedIndex, setSelectedIndex] = useState()
  const navigate = useNavigate();
  const [listData, setListData] = useState();
  const [editOpen, setEditOpen] = useState(false)


  const DataPerPage = 5
  let offset = (Page - 1) * DataPerPage;


  const { data: ListData, isLoading: isListLoading, isFetching: isListFetching } = useAllNpoListQuery({
    limit: DataPerPage,
    offset: offset
  })
  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }


  useEffect(() => {
    if (isListLoading || isListFetching) {
      setLoading(true)
    }
    else {
      setListData(ListData?.result?.rows);
      setCount(Math.ceil(ListData?.result?.count / DataPerPage) || 0)
      setTimeout(() => {

        setLoading(false)
      }, 500);
    }

  }, [ListData, isListFetching, isListLoading])

  const handleActions = (indx, id) => {
    let itm = [actionIndex];
    setSelectedIndex(id)

    itm[indx] = true;
    setActionIndex(itm)
  }

  const handlePageChange = (e, value) => {
    let itm = [actionIndex];
    itm[actionIndex] = false;
    setActionIndex(itm)
    setSelectedIndex('')
    setcurrentPage(value)
  }


  const handleActionsClose = (indx) => {
    let itm = [actionIndex];
    itm[indx] = false;
    setActionIndex(itm)
  }
  const handleDeleteYes = () => {

    // DeleteStore({ Id: selectedIndex })

    //     .then((res) => {
    //         if (res?.error) {
    //             console.log(res.error)
    //             toast.error("Error Occured")
    //         }
    //         else if (res.data) {
    //             setSelectedIndex('');
    //             setActionIndex('');
    //             toast.success("Store Successfully Deleted")
    //         }

    //     })
    //     .catch((err)=>toast.error("Internal Server Error"))

  }

  const handleDelete = (index) => {
    AlertComponent({ handleDeleteYes })
  }

  const handleView = () => {
    // setViewOpen(!viewOpen)
    // navigate(`${selectedIndex}`)

  }


  const handleEdit = () => {
    setEditOpen(!editOpen)
    if (editOpen == true) {
      setActionIndex('')
    }
  }

  const handleSwitchToggle=(data,e)=>
    {
      console.log(data.id)
      let customizedData ={
        name:data?.name,
        email:data?.email,
        address:data?.address,
        number:data?.number,
        password:data?.password,
        isActive:e?.target.checked
      }
      console.log(customizedData)
    }


  return (
    <>
      <div className=' flex flex-col gap-8 overflow-y-scroll scroll-m-1 py-3 px-3 bg-slate-50 h-full w-full'>
        <div className=' flex w-full justify-end'>
          <div onClick={() => handleModalOpen()} className=' hover:opacity-80 hover:border-slate-500 py-[3px] px-3 text-[13px]  bg-slate-200 border border-slate-700 rounded cursor-pointer'>
            <span>ADD</span>
          </div>
        </div>
        <div className='w-full flex-wrap  rounded '>
          <DialogComponent open={isModalOpen} maxWidth={'sm'}>
            <AddNgo close={handleModalClose} />
          </DialogComponent>

          <DialogComponent open={editOpen} maxWidth={'md'}>
            <EditNgo Id={selectedIndex} close={handleEdit} />
          </DialogComponent>

          <div className='  w-full flex flex-col gap-5 items-center'>
            <div className=' hidden  md:table rounded w-full '>
              <div className='head divide-x-2 bg-slate-300 text-black rounded border-r border-l flex justify-between'>
                <div className=' w-full font-medium  text-[13.5px] self-center py-3 pl-3 uppercase' >NGO  name</div>
                <div className=' w-full font-medium text-[13.5px] self-center py-3 pl-3 uppercase'>NGO email</div>
                <div className=' w-full font-medium text-[13.0px] self-center py-3 pl-3 uppercase'>Ngo number</div>
                <div className=' w-full font-medium text-[13.0px] self-center py-3 pl-3 uppercase'>Status</div>
                <div className=' w-1/2 font-medium text-[13.5px] self-center py-3 pl-3 uppercase'>Action</div>
              </div>
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
                      listData?.map((itm, indx) => {
                        return <div key={indx} className=' w-full  gap-1  border-zinc-400  flex justify-between border   rounded-md  px-1 py-3'>
                          <span className=' w-[23%]  text-[14.6px] flex items-center   h-6 pl-2 lg:pl-4  '> <span className=' '>{itm?.name}</span> </span>
                          <span className='  w-[22%] noScroll flex self-center h-6 md:h-7 py-0  text-[14.6px] '>{itm?.email}</span>
                          <span className=' w-[24%] pl-3  text-[13.6px] h-6'>{itm?.number}</span>
                          <span className=' w-[22%]  text-[13.6px] h-6'><Switch onChange={(e)=>handleSwitchToggle(itm,e)}/></span>
                          <span className=' w-[10%]  text-[14.6px] h-6 relative '> <span className=' hover:opacity-75 w-fit flex items-center pt-1 w-1/4 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx, itm?.id) }}><BsThreeDotsVertical /></span>
                            {
                              actionIndex[indx] === true ?
                                <>  <span className=' border select-none rounded-full  lg:left-[20px] w-[115px] divide-x-2  2xl:left-[20px]  gap-1  py-1 px-1 shadow  bottom-0 bg-white absolute flex  items-center justify-between'>
                                  <span onClick={() => handleEdit()} className=' cursor-pointer w-full flex items-center justify-center hover:opacity-70'><RiEdit2Fill size={18} /></span>
                                  <span onClick={() => handleDelete(indx)} className=' cursor-pointer w-full flex items-center justify-center hover:opacity-70'><AiFillDelete size={17} /></span>
                                  <span onClick={() => handleView()} className=' cursor-pointer w-full flex items-center justify-center hover:opacity-70'><IoMdEye size={18} /></span>
                                </span>
                                </>
                                : ""
                            }
                          </span>
                        </div>
                      })
                }
              </div>
            </div>
            <div className='   md:hidden table rounded '>
              <div className=' flex flex-col md:flex-row items-start gap-1  '>
                {
                  listData?.map((itm, indx) => {
                    return <div key={indx} className=' w-full  items-start bg-white select-none sm:flex-col border-slate-400 flex-col md:flex-row  gap-3 border-2   rounded-md  px-2 py-3'>
                      <span className=' w-full text-[13.4px]  flex gap-14 '><span className=' font-semibold'> Ngo name</span>  {itm?.name} </span>
                      <span className=' w-full text-[12.8px]  flex gap-6'> <span className='  flex-wrap font-semibold'>Ngo email : </span> <span className=' w-auto flex-wrap text-wrap break-words'>{itm?.accessToken}</span> </span>
                      {/* <span className=' w-full  text-[13.4px] flex gap-10'><span className=' font-semibold'>Api store Key :</span> {itm.apiKey}</span> */}
                      {/* <span className=' w-full  text-[13.4px] flex gap-10'><span className=' font-semibold'>Api store pass </span>{itm.apiPassword}</span> */}
                      <span className=' w-full  text-[13.4px] gap-20 relative  flex'> <span className=' font-semibold'>Actions  </span> <span className=' pt-1 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx, itm?.id) }}><BsThreeDotsVertical /></span>
                        {
                          actionIndex[indx] === true ?
                            <>  <span className=' select-none rounded-full lg:right-[80px] w-[130px] divide-x-2 2xl:right-[100px]  gap-1  py-1 px-2 shadow  right-5 bottom-0 bg-white absolute flex  items-center justify-between'>
                              <span className=' cursor-pointer w-full flex items-center justify-center'><RiEdit2Fill size={17} /></span>
                              {/* <span onClick={() => handleDelete(indx)} className=' cursor-pointer w-full flex items-center justify-center'><AiFillDelete size={16} /></span> */}
                              <span onClick={() => handleView()} className=' cursor-pointer w-full flex items-center justify-center'><IoMdEye size={17} /></span>
                            </span>
                            </>
                            : ""
                        }
                      </span>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
          <div className=' w-full justify-end flex py-2 self-end'>
            <Pagination
              shape="rounded"
              variant="outlined"
              color="standard"
              page={Page}
              count={count}
              onChange={handlePageChange}
            // renderItem={(item) => <PaginationItem {...item}   className=" shadow-md" />}
            />
          </div>
        </div>
      </div>


    </>
  )
}

export default Home;