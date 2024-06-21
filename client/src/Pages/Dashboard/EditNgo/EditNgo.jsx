import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
// import InputComponent from '../../components/InputComponent';
import InputComponent from '../../../components/InputComponent';
import * as yup from 'yup';
// import { useAddNewStoreMutation } from '../../services/StoreServices';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Cookies from 'js-cookie'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useCreateNpoMutation, useGetSingleNpoQuery, useUpdateNpoMutation } from '../../../services/NpoService';
import { VscLoading } from "react-icons/vsc";



function EditNgo(
    {
        close,
        Id
    }
) {


    const [showPassword, setShowPassword] = useState("password");
    const [UpdateNpo] = useUpdateNpoMutation()
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [NpoData, setNpoData] = useState()


    const { data: singleData, isFetching: isdataFetching, isLoading: isdataLoading } = useGetSingleNpoQuery({ Id })

    useEffect(() => {
        if (isdataLoading || isdataFetching) {
            setLoading(true)
        }
        else { 
            setNpoData(singleData?.result);
            setTimeout(() => {
                setLoading(false)
            }, 300);
        }

    }, [singleData, isdataLoading, isdataFetching])
    /* validation schema */
    const validationSchema = yup.object().shape({

        name: yup.string().strict().matches(/^[a-zA-Z 0-9]+$/, "Special characters not allowed").required('name is required').trim("Invalid name"),
        email: yup.string().strict().email('Enter Valid email').required('email is required').trim("Invalid email"),
        // address: yup.string().required('address is required').trim("Enter valid address").strict(),
        password: yup.string().required('password is required').min(6, "minimum 6 characters required").trim("Invalid password").strict(),
        number: yup.string().min(10, "Invalid number").max(10, "Invalid number").trim("Invalid number")
    });

    /* initial values */
    const initialValues = {
        name: NpoData?.name || '',
        email: NpoData?.email || '',
        // address: NpoData?.address || '',
        number: NpoData?.number || '',
        password: NpoData?.password || ''
    };

    /* handle form submit */
    const handleSubmit = (data, { resetForm }) => {
        setUpdateLoading(true)
        // localStorage.setItem('ngolist', JSON.stringify(updatedData));
        console.log(data);
        UpdateNpo({ Id: Id, data: data })
            .then((res) => {
                if (res.error) {
                    toast.error(res?.error?.data?.message)
                }
                else {
                    close()
                    toast.success(res.data.message)
                }
                setUpdateLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setUpdateLoading(false)
            })
    };

    return (
        <div className='relative flex p-1 flex-col gap-6'>
            {
                loading ?
                    <div>
                        {/* <span className=' animate-spin '><AiOutlineLoading3Quarters /></span> */}
                        <span className='flex drop-shadow-sm w-full items-center px-2 justify-center py-1'> <span className=' py-1 px-[15.5px] animate-spin'><VscLoading size={22} /></span>
                        </span>

                    </div>
                    :
                    <>
                        <div className=' flex text-lg font-semibold justify-between'>
                            Edit Ngo
                            {/* <div> */}
                            <span onClick={() => close()} className=' top-[-20px] absolute items-center justify-center right-[-24px] hover:opacity-80 bg-red-400 text-white cursor-pointer py-[5px] px-[14px] '>X</span>
                            {/* </div> */}
                        </div>
                        <div>
                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {(settingsProps) => (
                                    <Form className='flex flex-col gap-[25px]'>
                                        <div className='items-center grid md:grid-cols-1 grid-cols-1 gap-x-6 gap-y-6'>
                                            <div className=' flex items-center gap-1'>

                                                <InputComponent
                                                    required
                                                    label={'Npo name'}
                                                    placeholder={'Enter ngo name'}
                                                    name={'name'}
                                                    onChange={settingsProps.handleChange}
                                                    value={settingsProps.values.name}
                                                />

                                            </div>
                                            <InputComponent
                                                required
                                                label={'Email'}
                                                placeholder={'Enter ngo email'}
                                                name={'email'}
                                                onChange={settingsProps.handleChange}
                                                value={settingsProps.values.email}
                                            />
                                            {/* <InputComponent
                                                required
                                                label={'Address'}
                                                placeholder={'Enter ngo Address'}
                                                name={'address'}
                                                onChange={settingsProps.handleChange}
                                                value={settingsProps.values.address}
                                            /> */}
                                            <div className=' relative flex  items-center'>

                                                <InputComponent
                                                    required
                                                    type={showPassword}
                                                    label={'Password'}
                                                    placeholder={'Enter ngo password'}
                                                    name={'password'}
                                                    onChange={settingsProps.handleChange}
                                                    value={settingsProps.values.password}
                                                />
                                                <span className=' absolute cursor-pointer right-2 bottom-3'>
                                                    {

                                                        showPassword === "text" ?
                                                            <IoEye onClick={() => setShowPassword("password")} size={18} />
                                                            :
                                                            <IoEyeOff onClick={() => setShowPassword("text")} size={18} />

                                                    }

                                                </span>
                                            </div>
                                            <InputComponent
                                                label={'Contact Number'}
                                                placeholder={'Enter ngo contact number'}
                                                name={'number'}
                                                onChange={settingsProps.handleChange}
                                                value={settingsProps.values.number}
                                            />
                                        </div>
                                        <div className='flex items-center justify-end gap-4'>

                                            <button type='submit' className='mt-2 border-none outline-none select-none bg-slate-300 text-black hover:opacity-75 rounded px-4 py-[5px]'>
                                                <span className='flex w-full items-center px-2 justify-center py-1'> {updateLoading ? <span className=' py-1 px-[10px] animate-spin'><AiOutlineLoading3Quarters /></span> : <span>Update</span>}</span>
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </>
            }

        </div>
    )
}

export default EditNgo;