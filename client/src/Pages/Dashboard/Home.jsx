import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import DataTable from '../../components/DataTable'
import MobileTabel from '../../components/MobileTable';
import DialogComponent from '../../components/DialogComponent'
import AddNgo from './AddNgo/AddNgo';
import { useAllNpoListQuery, useDeleteNpoMutation, useUpdateNpoMutation } from '../../services/NpoService';
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
import { toast } from 'react-toastify';
import { IoWarning, IoWarningOutline } from 'react-icons/io5';


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
  const [toggleData, setToggleData] = useState()

  const [UpdateNpo] = useUpdateNpoMutation();
  const [DeleteNpo] = useDeleteNpoMutation();

  const DataPerPage = 5;
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
      setToggleData(ListData?.result?.rows);
      setCount(Math.ceil(ListData?.result?.count / DataPerPage) || 0)
      setTimeout(() => {

        setLoading(false)
      }, 300);
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
    DeleteNpo({ Id: selectedIndex })
      .then((res) => {
        if (res?.error) {
          console.log(res.error)
          toast.error("Error Occured")
        }
        else if (res.data) {
          setSelectedIndex('');
          setActionIndex('');
          toast.success("Store Successfully Deleted")
        }

      })
      .catch((err) => toast.error("Internal Server Error"))

  }

  const handleDelete = (index) => {
    AlertComponent({ heading: "Are you sure to Delete ?", handleDeleteYes })
  }

  const handleView = (id) => {
    // setViewOpen(!viewOpen)
    navigate(`npo/details/${id}`)
  }


  const handleEdit = () => {
    setEditOpen(!editOpen)
    if (editOpen == true) {
      setActionIndex('')
    }
  }

  const handleSwitchToggle = (data, e) => {
    console.log(data.id)
    let customizedData = {
      name: data?.name,
      email: data?.email,
      address: data?.address,
      number: data?.number,
      password: data?.password,
      isActive: e?.target.checked
    }
    console.log(customizedData)
    AlertComponent({
      heading: "Are you sure to Change ?",
      handleDeleteYes: () => {
        UpdateNpo({ Id: data?.id, data: customizedData })
          .then((res) => {
            if (res.error) {
              // toast.error(res?.error?.data?.message)
              console.log(res?.error?.data?.message)
            }
            else {
              // close()
              //  toast.success(res?.data?.message)
              console.log(res?.data?.message)
            }
            // setUpdateLoading(false)
          })
          .catch((err) => {
            console.log(err)
            // setUpdateLoading(false)
          })
      }
    })

  }


  return (
    <>
      <div className=' flex flex-col gap-8 overflow-y-scroll scroll-m-1 py-3 px-3 bg-slate-50 h-full w-full'>
        <div className=' flex w-full justify-end'>
          <div onClick={() => handleModalOpen()} className=' hover:opacity-80 hover:border-slate-500 py-[5.5px] px-3 text-[13px]  bg-slate-300 border border-slate-700 rounded cursor-pointer'>
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
                <div className=' w-full font-medium  text-[13.5px] self-center py-[10.6px] pl-3 uppercase' >NPO  name</div>
                <div className=' w-full font-medium text-[13.5px] self-center py-[10.6px] pl-3 uppercase'>NPO email</div>
                <div className=' w-full font-medium text-[13.0px] self-center py-[10.6px] pl-3 uppercase'>Npo number</div>
                <div className=' w-full font-medium text-[13.0px] self-center py-[10.6px] pl-3 uppercase'>Active</div>
                <div className=' w-1/2 font-medium text-[13.5px] self-center py-[10.6px] pl-3 uppercase'>Action</div>
              </div>
              <div className=' flex flex-col gap-2 pt-2  '>
                {
                  listData?.length <= 0 || !listData ?
                    <div className=' py-3 flex items-center justify-center'>
                      <span className=' w-full border py-[7px]  justify-center flex gap-3 items-center'>No Data Found <IoWarningOutline size={19} /></span>
                    </div>
                    :
                    listData?.map((itm, indx) => {
                      return <div key={indx} className=' w-full  gap-1 border  flex justify-between    rounded-md  px-1 py-3'>
                        <span className=' w-[23%]  text-[14.6px] flex items-center    h-[22px] pl-2 lg:pl-3  '> <span className=' '>{itm?.name ? itm?.name : "N/A"}</span> </span>
                        <span className='  w-[22%] noScroll flex self-center h-[21px] md:h-[26px] py-0  text-[14.6px] '>{itm?.email ? itm?.email : "N/A"}</span>
                        <span className=' w-[23%] pl-3  text-[14.2px] h-[20px]'>{itm?.number ? itm?.number : "N/A"}</span>
                        <span className=' w-[22%] flex items-center text-[13.6px] h-[20px]'><Switch checked={itm?.isActive} onChange={(e) => handleSwitchToggle(itm, e)} /></span>
                        <span className=' w-[10%]  text-[14.6px] h-[20px] relative '> <span className=' hover:opacity-75 w-fit flex items-center pt-1  cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx, itm?.id) }}><BsThreeDotsVertical /></span>
                          {
                            actionIndex[indx] === true ?
                              <>  <span className=' border select-none rounded-full md:right-[70px]  lg:right-[135px] w-[115px] divide-x-2  2xl:right-[160px]  gap-1  py-1 px-1 shadow  bottom-0 bg-white absolute flex  items-center justify-between'>
                                <span onClick={() => handleEdit()} className=' cursor-pointer w-full flex items-center justify-center hover:opacity-70'><RiEdit2Fill size={18} /></span>
                                {/* <span onClick={() => handleDelete(indx)} className=' cursor-pointer w-full flex items-center justify-center hover:opacity-70'><AiFillDelete size={17} /></span> */}
                                <span onClick={() => handleView(itm.id)} className=' cursor-pointer w-full flex items-center justify-center hover:opacity-70'><IoMdEye size={18} /></span>
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
              <div className=' flex flex-col  items-start gap-1  '>
                {
                  listData?.length <= 0 || !listData ?
                    <div className=' w-full py-3 flex items-center justify-center'>
                      <span className=' w-full border py-[7px]  justify-center flex gap-3 items-center'>No Data Found <IoWarningOutline size={19} /></span>
                    </div>
                    :

                    listData?.map((itm, indx) => {
                      return <div key={indx} className=' w-full  items-start bg-white select-none sm:flex-col border-slate-400 flex-col md:flex-row  gap-3 border-2   rounded-md  px-2 py-3'>
                        <span className=' w-full text-[13.4px]  flex gap-14 '><span className=' font-semibold'> Npo name</span>  {itm?.name ? itm?.name : "N/A"} </span>
                        <span className=' w-full text-[12.8px]  flex gap-6'> <span className='  flex-wrap font-semibold'>Npo email : </span> <span className=' w-auto flex-wrap text-wrap break-words'>{itm?.email ? itm?.email : "N/A"}</span> </span>
                        <span className=' w-full text-[12.8px]  flex gap-6'> <span className='  flex-wrap font-semibold'>Npo number : </span> <span className=' w-auto flex-wrap text-wrap break-words'>{itm?.number ? itm?.number : "N/A"}</span> </span>
                        <span className=' w-full text-[12.8px]  flex gap-6'> <span className='  flex-wrap font-semibold'>Active : </span> <span className=' w-auto text-[5px] flex-wrap text-wrap break-words'><Switch size='small' checked={itm?.isActive} onChange={(e) => handleSwitchToggle(itm, e)} /></span> </span>
                        {/* <span className=' w-full  text-[13.4px] flex gap-10'><span className=' font-semibold'>Api store Key :</span> {itm.apiKey}</span> */}
                        {/* <span className=' w-full  text-[13.4px] flex gap-10'><span className=' font-semibold'>Api store pass </span>{itm.apiPassword}</span> */}
                        <span className=' w-full  text-[13.4px] gap-20 relative  flex'> <span className=' font-semibold'>Actions  </span> <span className=' pt-1 cursor-pointer' onClick={() => { actionIndex[indx] === true ? handleActionsClose(indx) : handleActions(indx, itm?.id) }}><BsThreeDotsVertical /></span>
                          {
                            actionIndex[indx] === true ?
                              <>  <span className=' select-none rounded-full left-[145px] sm:left-[200px] lg:left-[80px] w-[130px] divide-x-2 2xl:right-[100px]  gap-1  py-1 px-2 shadow  right-5 bottom-0 bg-white absolute flex  items-center justify-between'>
                                <span onClick={()=>handleEdit()} className=' cursor-pointer w-full flex items-center justify-center'><RiEdit2Fill size={17} /></span>
                                {/* <span onClick={() => handleDelete(indx)} className=' cursor-pointer w-full flex items-center justify-center'><AiFillDelete size={16} /></span> */}
                                <span onClick={() => handleView(itm.id)} className=' cursor-pointer w-full flex items-center justify-center'><IoMdEye size={17} /></span>
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
            {
              listData?.length > 0
              &&
              <Pagination
                shape="rounded"
                variant="outlined"
                color="standard"
                page={Page}
                count={count}
                onChange={handlePageChange}
              // renderItem={(item) => <PaginationItem {...item}   className=" shadow-md" />}
              />
            }
          </div>
        </div>
      </div>


    </>
  )
}

export default Home;