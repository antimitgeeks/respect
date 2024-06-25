import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import { useForgotPasswordMutation } from '../../services/AuthServices';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ForgetPassword() {

    let navigate = useNavigate();
    const [UserData, setUserData] = useState('');
    const [loading, setLoading] = useState(false)

    /* code for getting email from url */

    const paramEmail = useParams()
    console.log(paramEmail);
    const [forgotPassword] = useForgotPasswordMutation()

    /* form initialValues */
    const [initialValues, setInitialValues] = useState({
        password: '',
        confirmPassword: '',
    });


    /* form Validation using Yup */
    const validationSchema = yup.object().shape({
        password: yup.string().trim().required("password is required").min(6, "enter minimum 6 characters"),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').trim().required("confirm password is required").min(6, "enter minimum 6 characters"),
    });


    /* handling form submit */
    const handleSubmit = (data, { resetForm }) => {
        setLoading(true)
        setUserData(data);
        let dataaa = { password: data.password, confirmPassword: data.confirmPassword, role: paramEmail?.role }
        console.log(dataaa,'dataaa')
        forgotPassword({ data: dataaa, Id: paramEmail?.id })
            .then((res) => {
                if (res?.data) {
                    console.log(res?.data)
                    toast.success(res?.data?.message)
                    resetForm();
                    // toast.success("Go back to login page")
                    if (paramEmail?.role == 'npo') {
                        navigate('/login/npo')
                    }
                    else
                    {
                        navigate('/login/admin')
                    }
                }
                else if (res?.error) {
                    toast.error('Something went wrong')
                }
                setLoading(false)
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                setLoading(false)
            })
        // navigate('/')
    };



    // let localData= JSON.parse(localStorage.getItem('IsUserLogged'))
    // /////////// if user already logged in will be redirect to dashboard */
    // useEffect(()=>
    // {
    //     if(localData || localData !=null  )
    //         {
    //             navigate('/dashboard')
    //         }
    // },[localData])

    return (
        <div className='h-[100vh] flex w-full items-center justify-center'>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {(loginProps) => (
                    <Form className='w-full flex items-center justify-center'>
                        <div className='flex justify-center flex-col gap-8 items-center w-1/2 border rounded shadow px-2 mb-20 py-3'>
                            <div>
                                <span className=' font-mono  text-2xl  tracking-wide'>Reset Password</span>
                            </div>
                            <div className=' w-full items-center justify-center grid grid-cols-1 gap-5'>
                                <div className=' w-1/2 relative  mx-auto'>

                                    <InputComponent
                                        value={loginProps.values.password}
                                        name='password'
                                        onChange={loginProps.handleChange}
                                        type='password'
                                        placeholder={'Enter new Password'}
                                    />
                                </div>
                                <div className='relative w-1/2 self-center  mx-auto'>

                                    <InputComponent
                                        value={loginProps.values.confirmPassword}
                                        name='confirmPassword'
                                        onChange={loginProps.handleChange}
                                        type='password'
                                        placeholder={'Confirm your Password'}
                                    />
                                </div>


                            </div>

                            <div className=' w-1/2  gap-1 flex flex-col'>
                                <button type='submit' className=' text-white mt-1 border-none outline-none bg-slate-400 hover:opacity-75 rounded px-4 py-2'> {loading ? <span className=' flex w-full items-center justify-center animate-spin py-1 '><AiOutlineLoading3Quarters size={17} /></span> : "Submit"}</button>

                                {/* <button type='submit' className=' mt-1 border-none outline-none bg-slate-400 rounded px-4 py-2'>Submit</button> */}
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ForgetPassword;
