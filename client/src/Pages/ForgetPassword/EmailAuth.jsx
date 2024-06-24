import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import { useResetPasswordMutation } from '../../services/AuthServices';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

function EmailAuth() {

    let navigate = useNavigate();
    const [UserData, setUserData] = useState('');
    const [linksend, setLinkSend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resetPassword] = useResetPasswordMutation();
    const { role } = useParams();
    console.log(role)


    /* form initialValues */
    const [initialValues, setInitialValues] = useState({
        email: ''
    });


    /* form Validation using Yup */
    const validationSchema = yup.object().shape({
        email: yup.string().trim().required("email is required").email(),
    });


    /* handling form submit */
    const handleSubmit = (data, { resetForm }) => {
        setLoading(true)
        setUserData(data)
        console.log(data);
        const roleData = { email: data?.email, role: role }
        // tutorialService.resetPassword(data)
        resetPassword({ data: roleData })
            .then((dta) => {
                if (dta?.data) {
                    setTimeout(() => {
                        // toast.success(<div className=' cursor-pointer ' onClick={() => toast.dismiss()}>{dta?.data?.message}</div>)
                        toast.success(dta?.data?.message)
                        setLinkSend(true);
                        resetForm();
                    }, 100);
                    setTimeout(() => {
                        if (role == 'admin') {
                            navigate('/login/admin')
                        }
                        else {
                            navigate('/login/npo')
                        }
                    }, 600);
                }
                else if (dta?.error) {
                    console.log(dta?.error)
                    // toast.custom(<div className=' p-2 rounded cursor-pointer bg-red-400 text-white' onClick={()=>toast.dismiss()}>{dta?.error?.data?.message || "Invalid Email"}</div>);
                    // toast.error(<div className=' cursor-pointer' onClick={() => toast.dismiss()}>{dta?.error?.data?.message || "Invalid Email"}</div>, { duration: 2000 })
                    toast.error(dta?.error?.data?.message || "Internal server error")
                    setLinkSend(false)
                }
                setLoading(false)
            })
            .catch((err) => { toast.error(err.response.data.message); setLoading(false); setLinkSend(false) })

    };


    /*if user already logged in will be redirect to dashboard */
    // let localData= JSON.parse(localStorage.getItem('IsUserLogged'))
    // useEffect(() => {
    //     if (localData || localData != null) {
    //         navigate('/dashboard')
    //     }
    // }, [localData])

    return (
        <div className='h-[100vh] relative flex-col gap-2 flex w-full items-center justify-center'>
            <span className=' text-[18px]  text-green-500'> {linksend && "Check Your Email to Reset Password !"} </span>

            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {(loginProps) => (
                    <Form className='w-full flex items-center justify-center'>
                        <div className='flex justify-center flex-col gap-8 items-center w-1/2 border rounded shadow px-2 mb-12 py-4'>
                            <div>
                                <span className=' font-mono  text-2xl  tracking-wide'>Reset Password</span>
                            </div>
                            <div className=' w-full items-center justify-center grid grid-cols-1 gap-5'>
                                <div className=' w-1/2 relative gap-2 flex-col flex  mx-auto'>

                                    <InputComponent
                                        value={loginProps.values.email}
                                        name='email'
                                        onChange={loginProps.handleChange}
                                        type='email'
                                        placeholder={'Enter your email'}
                                    />
                                    <div className=' w-full flex end justify-end'>
                                        <span className='  text-black cursor-pointer ' onClick={() => { role == 'admin' ? navigate('/login/admin') : navigate('/login/npo') }}> <u>Login ? </u></span>
                                    </div>
                                </div>



                            </div>

                            <div className=' w-1/2  gap-1 flex flex-col'>
                                <button type='submit' className='  border-none outline-none bg-slate-400 hover:opacity-75 rounded px-4 py-2'> {loading ? <span className=' flex w-full items-center justify-center animate-spin py-1 '><AiOutlineLoading3Quarters size={17} /></span> : "SUBMIT"}</button>
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
}

export default EmailAuth;
