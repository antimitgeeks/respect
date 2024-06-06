import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import '../pages.css'
import { FaRegUser, FaShoppingCart, FaToggleOn } from "react-icons/fa";
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import CompanyLogo from '../../Assets/itg_logo.png'
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
import { FiShoppingCart } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { useEffect } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { jwtDecode } from 'jwt-decode';


function Dashboard() {

  const LoginData = useSelector(state => state.loginSlice.data)


  const navigate = useNavigate();
  const [ToggleProfile, setToggleProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('home')
  const [sideBarToggle, setSideBarToggle] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);
  const [role, setRole] = useState('admin');
  const userToken = Cookies.get("isLogged");



  useEffect(() => {
    console.log(decodedToken?.role)
    setRole(decodedToken?.role)

  }, [decodedToken, userToken])


  useEffect(() => {
    if (userToken?.length > 0) {
      const DecodedData = jwtDecode(userToken);
      setDecodedToken(DecodedData);
    }
  }, [userToken]);

  const location = useLocation()
  /////// handling user logout /////////
  const handleLogout = () => {
    localStorage.removeItem('IsUserLogged')
    // Cookies.remove("AuthLogin");
    Cookies.remove("isLogged");

    setTimeout(() => {
      role == 'npo' ?
        navigate('/login/npo')
        :
        navigate('/login/admin')
    }, 500);
  }

  //////// handle sidebar toggle ////////
  const handletoggle = () => {
    setSideBarToggle(!sideBarToggle)
  }

  const handleProfileToggle = () => {
    setToggleProfile(!ToggleProfile)
  }

  let pathName = (window.location.pathname.split('/'))
  let ActivePath = (pathName[pathName.length - 1])



  //   useEffect(() => {
  //     if (!userToken || userToken === null) {
  //         navigate('/')
  //     }
  // }, [userToken])


  return (
    <div>
      <div className=' h-8 w-full flex items-center justify-center bg-[#f49a86]'>
        {
          role == 'Admin'
            ?
            <span>Welcome to the Respect Admin Panel</span>
            :
            <span>Welcome to the Respect Npo Panel</span>

        }
      </div>
      <div className=' h-12 border-b-2  relative px-2 py-0 flex justify-end items-center  w-full bg-white'>

        <span className='w-full  '>
          <span onClick={() => navigate('/dashboard')} className='text-lg w-fit cursor-pointer text-white select-none italic pl-1 flex  items-center'><img className=' object-cover w-32' src="https://53bc37-e5.myshopify.com/cdn/shop/files/Screenshot_2024-05-07_at_7.14.21_PM.png?v=1715134582" alt="" /></span>
        </span>

        <span onClick={() => handleProfileToggle()} className=' select-none cursor-pointer flex items-center justify-center text-white w-8 h-8 bg-slate-400 rounded-full   font-semibold'>
          {role == 'Admin' ? 'A' : 'N'}
        </span>
        {

          <div className={` ${ToggleProfile ? "mymove" : "mymoveReverse"} transition-all duration-500 top-[45px] px-2 select-none  text-white  flex flex-col gap-2 absolute w-[120px] z-[500] rounded py-2 bg-slate-500`}>
            <span onClick={() => handleLogout()} className=' transition ease-in duration-200 cursor-pointer self-center flex items-center hover:opacity-80 gap-2'> <RiLogoutBoxLine /> Logout</span>
          </div>
        }

      </div>
      <div className=' h-[calc(100vh-80px)] bg-slate-50 w-full  flex gap-0'>
        <div className={`  h-full   flex ${sideBarToggle ? "w-[245px] " : " w-[105px]"}`}>
          <div className='  w-auto    bg-slate-200  shadow-sm border-slate-300  h-full px-3 py-2 flex flex-col gap-2'>
            <div className=' flex flex-col gap-2 mt-5'>

              {/* <span onClick={() => handletoggle()} className={` self-end pb-2 cursor-pointer text-black ${sideBarToggle ? "px-0" : "px-3"} `}>
              {
                sideBarToggle ?

                  <AiOutlineMenuFold size={25} />
                  :
                  <AiOutlineMenuUnfold size={25} />
              }
            </span> */}
              {/* <span className=' font-semibold text-[18px]  flex items-center justify-center px-0 pb-1 select-none'> <img src={CompanyLogo} className={`${sideBarToggle ? " select-none  w-[80px] h-[70px]" : " w-[45px] h-[45px]"}`} alt="" /> </span> */}
              {
                role == 'Admin' ?
                  <>
                    <span className={`  ${ActivePath.includes('dashboard') ? " bg-white  text-black" : " bg-slate-300"} rounded-lg cursor-pointer  border    py-2 flex gap-2 items-center pl-4 pr-12 `} onClick={() => { navigate('') }}> <IoHomeOutline />{sideBarToggle ? <span className='  m-0 p-0'>NPOS</span> : ''} </span>
                    {/* <span className={`  ${ActivePath.includes('reports') ? " bg-white  text-black" : " bg-slate-300"} cursor-pointer  border  rounded-lg  py-2 flex gap-2 items-center pl-4 pr-12 `} onClick={() => { navigate('reports') }}> <LiaClipboardListSolid />{sideBarToggle ? <span className='  m-0 p-0'>Reports</span> : ''} </span> */}
                  </>
                  :
                  <>
                    <span className={`  ${ActivePath.includes('dashboard') ? " bg-white  text-black" : " bg-slate-300"} rounded-lg cursor-pointer  border    py-2 flex gap-2 items-center pl-4 pr-12 `} onClick={() => { navigate('') }}> <IoHomeOutline />{sideBarToggle ? <span className='  m-0 p-0'>Page</span> : ''} </span>
                  </>

              }
            </div>
          </div>
        </div>
        <div className=' w-full bg-slate-50'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
