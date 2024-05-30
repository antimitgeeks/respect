import React, { useEffect, useState } from 'react';
import { Routes, Route, } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Dashboard/Home';
// import NoPageFound from './Pages/NoPageFound';
// import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import EmailAuth from './Pages/ForgetPassword/EmailAuth';
import Cookies from 'js-cookie'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';


function Routing() {
    const [authenticateLogin, setAthenticateLogin] = useState(true);

    const userToken = Cookies.get("isLogged");
    //////// Checking if user is logged or not ////////////  
    useEffect((e) => {
        if (!userToken || userToken === null) {
            setAthenticateLogin(false)
        }
        else {
            setAthenticateLogin(true)
        }
    }, [])

    // const userToken = Cookies.get("isLogged");
    // useEffect(()=>
    // {

    //     if (!userToken ||  userToken === null) {
    //                 setAthenticateLogin(false)
    //             }
    //             else {
    //                     setAthenticateLogin(true)
    //                 }

    // },)
    // console.log(userToken)

    return (
        <div>
            <Routes>
                <Route path="/" element={<Login auth={setAthenticateLogin} />} />
                <Route path="/forgot-password/:id" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<EmailAuth />} />
                <Route path="*" element={<Login auth={setAthenticateLogin} />} />
                 { 
                     authenticateLogin ?
                        <Route path="/dashboard" element={<Dashboard />} >
                            <Route path='' element={<Home />} />
                        </Route> 
                          : ""
              }  

            </Routes>
        </div>
    )
}

export default Routing
