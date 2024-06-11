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
import Report from './Pages/Reports/Report';
import NpoLogin from './Pages/Npo Pages/NpoLogin';
import { jwtDecode } from 'jwt-decode';
import NpoHome from './Pages/Npo Pages/NpoHome/NpoHome';
import NpoView from './Pages/Npo Pages/NppView/NpoView';
import NpoPreview from './Pages/Npo Pages/NpoPagePreview/NpoPreview';
import WelcomePage from './Pages/WelcomePage';
import ReportDetail from './Pages/Reports/ReportDetail';


function Routing() {
    const [authenticateLogin, setAthenticateLogin] = useState(true);
    const [decodedToken, setDecodedToken] = useState();
    const [role, setRole] = useState('admin')

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

    useEffect(() => {
        if (userToken?.length > 0) {
            const DecodedData = jwtDecode(userToken);
            setDecodedToken(DecodedData);
        }
    }, [userToken]);

    useEffect(() => {
        console.log(decodedToken?.role)
        setRole(decodedToken?.role)

    }, [decodedToken, userToken])


    return (
        <div>
            <Routes>
                <Route path="" element={<WelcomePage />} />
                <Route path="login/admin" element={<Login auth={setAthenticateLogin} />} />
                <Route path="login/npo" element={<NpoLogin auth={setAthenticateLogin} />} />
                <Route path="/forgot-password/:id" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<EmailAuth />} />
                <Route path="*" element={<Login auth={setAthenticateLogin} />} />
                <Route path="page/preview" element={<NpoPreview />} />
                {
                    authenticateLogin ?
                        <Route path="/dashboard" element={<Dashboard />} >
                            <Route path='' element={role == 'Admin' ? <Home />:<NpoHome />} />
                            <Route path='reports' element={<Report />} />
                            <Route path="reports/details/:id" element={<ReportDetail />} />
                            <Route path="npo/details/:id" element={<NpoView />} />
                        </Route>
                      :"" 
                } 
            </Routes>
        </div>
    )
}

export default Routing
