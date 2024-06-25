import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import Cookies from 'js-cookie';
import { setLoginData } from '../../Redux/Slices/loginSlice';
import { useDispatch } from 'react-redux';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useLoginMutation } from '../../services/AuthServices';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

function NpoLogin(props) {
    const userToken = Cookies.get("NpoAuthLogin");
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [decodedToken, setDecodedToken] = useState(null);
    const [userLoginData,setUserLoginData] = useState()
    const navigate = useNavigate();
    const isLogged =Cookies.get("isLogged");
    const isChecked =Cookies.get("NpoisChecked");
    const AuthData =Cookies.get("NpoAuthData");


    // useEffect(() => {
    //     if (isChecked?.length > 0) {
    //         let dta = JSON.parse(isChecked)
    //         setUserLoginData(dta)
    //     }
    // }, [isChecked]);

    useEffect(() => {
        if (AuthData?.length > 0 && AuthData) {
            let dta = JSON.parse(AuthData)
            setUserLoginData(dta)
        }
    }, [AuthData]);


    useEffect(() => {
        if (userToken?.length > 0) {
            const DecodedData = jwtDecode(userToken);
            setDecodedToken(DecodedData);
        }
    }, [userToken]);

    useEffect(() => {
        if (isLogged) {
            props.auth(true);
            navigate('/dashboard');
        }
    }, [isLogged, props]);

    const [LoginUser] = useLoginMutation();

    console.log(isLogged)
    const initialValues = {
        email: decodedToken?.email?.toLowerCase() || '',
        password: userLoginData?.password || '',
        rememberMe: userLoginData?.rememberMe 
    };

    const validationSchema = yup.object().shape({
        email: yup.string().trim("Enter valid email").required("email is required").email(),
        password: yup.string().trim("Enter valid password").required("password is required").strict(),
    });

    const handleSubmit = (data) => {
        setLoading(true);
        const loginData = { email: data?.email, password: data?.password ,role:'npo' };
        // console.log(data)
        LoginUser({ data: loginData })
            .then((res) => {
                setLoading(false)
                if (res?.data) {
                    if (data?.rememberMe) {
                        Cookies.set("NpoAuthLogin", `${res?.data?.result?.accessToken}`, { expires: 30 });
                        Cookies.set("NpoAuthData", JSON.stringify(data), { expires: 30 });
                    }
                    else {
                        var in30Minutes = 1 / 48;
                        Cookies.set("NpoAuthLogin", `${res?.data?.result?.accessToken}`, { expires: in30Minutes });
                        Cookies.set("NpoAuthData",JSON.stringify(data), { expires: in30Minutes });

                    }
                    dispatch(setLoginData(data))
                    Cookies.set("isLogged", `${res?.data?.result?.accessToken}`,{expires:30});
                    Cookies.set("NpoisChecked", JSON.stringify(data),{ expires: 30 });
                    // localStorage.setItem('IsUserLogged', JSON.stringify(data))
                    // toast.success("Login Successfull")
                    navigate('/dashboard')
                } else if (res?.error) {
                    toast.error(res?.error?.data?.message || "Internal server error");
                }
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.message || "Internal server error");
            });
    };

    return (
        <div className='h-[100vh] bg-slate-50 flex w-full items-center justify-center'>
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {(loginProps) => (
                    <Form className='w-full flex items-center justify-center'>
                        <div className='flex bg-white justify-center flex-col gap-8 items-center lg:w-1/2 w-5/6 border rounded-lg shadow px-0 sm:px-2 mb-20 py-4'>
                            <div>
                                <span className='font-mono text-[26px] tracking-wide'> NPO LOGIN</span>
                            </div>
                            <div className='w-full items-center justify-center grid grid-cols-1 gap-5'>
                                <div className='w-2/3 lg:w-1/2 relative mx-auto'>
                                    <InputComponent
                                        name='email'
                                        onChange={(e)=>loginProps.setFieldValue('email',e?.target?.value?.trim())}
                                        placeholder='Enter your Email'
                                        value={loginProps.values.email}
                                    />
                                </div>
                                <div className='relative w-2/3 lg:w-1/2 self-center mx-auto'>
                                    <InputComponent
                                        value={loginProps.values.password}
                                        name='password'
                                        onChange={loginProps.handleChange}
                                        type='password'
                                        placeholder='Enter your password'
                                    />
                                </div>
                                <div className='w-2/3 lg:w-1/2 flex flex-col mx-auto self-center gap-0'>
                                    <div className='w-full flex gap-1 flex-col sm:flex-row items-center justify-between'>
                                        <div className='gap-2 flex items-center'>
                                            <input
                                                type="checkbox"
                                                id='checkbox'
                                                name='rememberMe'
                                                // value={loginProps.values.rememberMe}
                                                defaultChecked={loginProps.values.rememberMe}
                                                onClick={(e) => loginProps.setFieldValue('rememberMe', e.target.checked)}
                                            />
                                            <label htmlFor='checkbox' className='select-none p-0 m-0 cursor-pointer text-[14px]'>Remember me?</label>
                                        </div>
                                        <div>
                                            <span onClick={() => navigate('/reset-password/npo')} className='cursor-pointer text-slate-600'>
                                                <u>Forgot Password?</u>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-2/3 lg:w-1/2 gap-1 flex flex-col'>
                                <button
                                    type='submit'
                                    className='text-white mt-1 border-none outline-none bg-slate-500 hover:opacity-75 rounded px-4 py-2'
                                >
                                    {isLoading ? (
                                        <span className='flex w-full items-center justify-center animate-spin py-1'>
                                            <AiOutlineLoading3Quarters size={17} />
                                        </span>
                                    ) : (
                                        "LOGIN"
                                    )}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default NpoLogin;
