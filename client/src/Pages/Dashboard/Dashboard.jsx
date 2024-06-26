import React, { useState, useEffect } from 'react'
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
    localStorage.removeItem('IsUserLogged');
    localStorage.removeItem('previewData');
    Cookies.remove("isLogged");

    setTimeout(() => {
      role === 'npo' ? navigate('/login/npo') : navigate('/login/admin')
    }, 300);
  }

  //////// handle sidebar toggle ////////
  const handletoggle = () => {
    setSideBarToggle(!sideBarToggle)
  }

  const handleProfileToggle = () => {
    setToggleProfile(!ToggleProfile)
  }
  const handleProfileClose = ()=>
    {
      setToggleProfile(false)
    }

  let pathName = (window.location.pathname.split('/'))
  let ActivePath = (pathName[pathName.length - 1])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setSideBarToggle(false);
      } else {
        setSideBarToggle(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div onClick={()=>handleProfileClose()} className='h-8 w-full flex items-center justify-center bg-[#f49a86]'>
        {
          role === 'Admin'
            ? <span>Welcome to the Respect Admin Panel</span>
            : <span>Welcome to the Respect Npo Panel</span>
        }
      </div>
      <div className='h-12 border-b-2 relative px-2 py-0 flex justify-end items-center w-full bg-white'>
        <span onClick={()=>handleProfileClose()} className='w-full'>
          <span onClick={() => navigate('/dashboard')} className='text-lg w-fit cursor-pointer text-white select-none italic pl-1 flex items-center'>
            <img className='object-cover w-32' src="https://53bc37-e5.myshopify.com/cdn/shop/files/Screenshot_2024-05-07_at_7.14.21_PM.png?v=1715134582" alt="" />
          </span>
        </span>
        {/* <span  onClick={()=>handleProfileClose()} className=' w-full flex justify-end cursor-pointer'> */}

          <span  onClick={() => handleProfileToggle()} className={` ${ToggleProfile ? "shadow" : ""} select-none cursor-pointer flex items-center justify-center text-white w-8 h-8 bg-slate-400 rounded-full font-semibold`}>
            {role === 'Admin' ? 'A' : 'N'}
          </span>
        {/* </span> */}
        {
          <div className={` ${ToggleProfile ? "mymove" : "mymoveReverse"} transition-all duration-500 top-[45px] px-2 mt-[14.2px] select-none text-white h-[41px] flex flex-col gap-2 absolute mr-2 w-[104.6px] z-[6000] rounded py-2 bg-slate-500`}>
            <span onClick={() => handleLogout()} className='transition ease-in duration-200 cursor-pointer self-center flex items-center hover:opacity-80 gap-2'>
              <RiLogoutBoxLine /> Logout
            </span>
          </div>
        }
      </div>
      <div className='h-[calc(100vh-80px)] bg-slate-50 w-full flex gap-0'>
        <div className={`h-full flex ${sideBarToggle ? "w-[225px]" : "w-[60px]"}`}>
          <div className=' w-full bg-slate-200 shadow-sm border-slate-300 h-full px-3  py-2 flex flex-col gap-2'>
            <div className='flex flex-col w-full gap-2 mt-5'>
              {
                role === 'Admin' ?
                  <>
                    <span className={` ${ActivePath.includes('dashboard') ? "bg-slate-500 text-slate-100" : " bg-slate-50 text-black"} rounded-lg cursor-pointer border py-2 flex gap-2 items-center w-full sm:pl-5 pl-[6px] sm:pr-12 sm:w-full pr-1`} onClick={() => { navigate('') }}>
                      <IoHomeOutline />{sideBarToggle ? <span className='m-0 p-0'>NPOS</span> : ''}
                    </span>
                    <span className={` ${pathName.includes('reports') ? "bg-slate-500 text-slate-100" : " bg-slate-50 text-black"} cursor-pointer border rounded-lg py-2 flex gap-2 sm:w-full w-full  items-center pl-[6px] sm:pr-12 sm:pl-4 pr-0`} onClick={() => { navigate('reports') }}>
                      <LiaClipboardListSolid />{sideBarToggle ? <span className='m-0 p-0'>Reports</span> : ''}
                    </span>
                  </>
                  :
                  <>
                    <span className={` ${ActivePath.includes('dashboard') ? "bg-slate-500 text-slate-100" : " bg-slate-50 text-black"} cursor-pointer border rounded-lg py-2 flex gap-2 sm:w-full  items-center pl-[4.8px] sm:pr-12 sm:pl-4 pr-[4.5px]`} onClick={() => { navigate('') }}>
                      <IoHomeOutline />{sideBarToggle ? <span className='m-0 p-0'>Page</span> : ''}
                    </span>
                  </>
              }
            </div>
          </div>
        </div>
        <div className='w-full bg-slate-50'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
