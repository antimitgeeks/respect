import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Switch from '@mui/material/Switch';

function LinksModal({ close,data }) {
    const NpoReduxData = useSelector((state) => state.NpoDataSlice.linksData);
    console.log(data);
    console.log(NpoReduxData);
    const [linksData, setLinksData] = useState({
        instagram:NpoReduxData?.instagram!=undefined ?NpoReduxData?.instagram: data?.linksData?.instagram?.link || '',
        facebook: NpoReduxData?.facebook!=undefined? NpoReduxData?.facebook: data?.linksData?.facebook?.link|| '',
        youtube: NpoReduxData?.youtube!=undefined?NpoReduxData?.youtube :data?.linksData?.youtube?.link ||  '',
        contactUs: NpoReduxData?.contactUs!=undefined ?NpoReduxData?.contactUs :data?.linksData?.contactUs?.link ||  '',
        websiteLink:  NpoReduxData?.websiteLink!=undefined?NpoReduxData?.websiteLink:data?.linksData?.websiteLink?.link || '',
        // backgroundColor: NpoReduxData?.backgroundColor || '#CBD5E1',
        // instaSwitch: NpoReduxData?.length != 0? NpoReduxData?.instaSwitch==false ?false:true:data?.linksData?.instagram?.show==false?false:true,
        // facebookSwitch: NpoReduxData?.length != 0? NpoReduxData?.facebookSwitch==false ?false:true:data?.linksData?.facebook?.show ==false?false:true,
        // youtubeSwitch: NpoReduxData?.length!=0? NpoReduxData?.youtubeSwitch==false ?false:true : data?.linksData?.youtube?.show ==false?false:true,
        // contactSwitch:NpoReduxData?.length!=0? NpoReduxData?.contactSwitch==false ?false:true:data?.linksData?.contactUs?.show==false?false:true,
        // websiteSwitch: NpoReduxData?.length!=0? NpoReduxData?.websiteSwitch==false ?false:true:data?.linksData?.websiteLink?.show==false?false:true,

        // facebookSwitch: data?.linksData?.facebook?.show == false ? false : true,
        // youtubeSwitch: data?.linksData?.youtube?.show == false ? false : true,
        // contactSwitch: data?.linksData?.contact?.show == false ? false : true,
        // websiteSwitch: data?.linksData?.websiteLink?.show == false ? false : true
    });

    const handleInputChange = (e) => {
        const { name } = e.target;
        let value;
        if (name === 'instagram' || name === 'backgroundColor' || name === 'facebook' || name === 'youtube' || name === 'contactUs' || name === 'websiteLink') {
            value = e.target.value;
        } else {
            value = e.target.checked;
        }
        setLinksData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validationSchema = Yup.object().shape({
        instagram: Yup.string(),
        facebook: Yup.string(),
        youtube: Yup.string(),
        contactUs: Yup.string().optional(),
        websiteLink: Yup.string().matches(/^[a-z A-Z `~!@#$%^&*(_+/:,.|)]+$/,"Invalid link")
    });

    const handleSave = () => {
        validationSchema.validate(linksData, { abortEarly: false })
            .then(() => {
                close(linksData);
            })
            .catch((err) => {
                console.log(err.errors)
                toast.error(err.errors[0]);
            });
    };

    return (
        <div className='flex flex-col gap-8 py-2 w-full relative z-[55000] bg-white'>
            <div className='relative flex w-full justify-between z-[9999999999999999999999999]'>
                <div className='text-lg font-semibold'>
                    Links
                </div>
                <div
                    className='absolute right-[-24px] flex items-center justify-center py-1 px-[11.5px] text-white bg-red-400 hover:opacity-75 bottom-6 cursor-pointer'
                    onClick={() => close()}
                >
                    X
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col sm:flex-row gap-1 sm:gap-[67px] sm:items-center'>
                    <span className='font-semibold'>Instagram</span>
                    <div className='w-full flex justify-between'>
                        <input
                            placeholder='Enter Instagram link'
                            type="text"
                            name='instagram'
                            value={linksData?.instagram}
                            className='sm:w-4/5 w-full px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        {/* <span>{linksData?.instaSwitch ? "Enabled" : "Disabled"}: <Switch checked={linksData.instaSwitch} name='instaSwitch' onChange={handleInputChange} /></span> */}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-1 sm:gap-[71px] sm:items-center'>
                    <span className='font-semibold'>Facebook</span>
                    <div className='w-full flex justify-between'>
                        <input
                            placeholder='Enter Facebook link'
                            type="text"
                            name='facebook'
                            value={linksData?.facebook}
                            className='sm:w-4/5 w-full px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        {/* <span>{linksData?.facebookSwitch ? "Enabled" : "Disabled"}: <Switch name='facebookSwitch' checked={linksData?.facebookSwitch} onChange={handleInputChange} /></span> */}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-1 sm:gap-20 sm:items-center'>
                    <span className='font-semibold'>YouTube</span>
                    <div className='w-full flex justify-between items-center'>
                        <input
                            placeholder='Enter YouTube link'
                            type="text"
                            name='youtube'
                            value={linksData?.youtube}
                            className='sm:w-4/5 w-full px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        {/* <span>{linksData?.youtubeSwitch ? "Enabled" : "Disabled"}: <Switch name='youtubeSwitch' checked={linksData?.youtubeSwitch} onChange={handleInputChange} /></span> */}
                    </div>
                </div>
                <div className='flex gap-1 sm:gap-[82px] flex-col sm:flex-row sm:items-center'>
                    <span className='font-semibold'>Contact</span>
                    <div className='w-full flex justify-between items-center'>
                        <input
                            placeholder='Enter contact number'
                            type="text"
                            name='contactUs'
                            value={linksData?.contactUs}
                            className='sm:w-4/5 w-full px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        {/* <span>{linksData?.contactSwitch ? "Enabled" : "Disabled"}: <Switch name='contactSwitch' checked={linksData?.contactSwitch} onChange={handleInputChange} /></span> */}
                    </div>
                </div>
                <div className='flex gap-1 sm:gap-[62px] flex-col sm:flex-row sm:items-center'>
                    <span className='font-semibold w-24'>Website link</span>
                    <div className='w-full flex justify-between items-center'>
                        <input
                            placeholder='Enter website link'
                            type="text"
                            name='websiteLink'
                            value={linksData?.websiteLink}
                            className='sm:w-4/5 w-full px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        {/* <span>{linksData?.websiteSwitch ? "Enabled" : "Disabled"}: <Switch name='websiteSwitch' checked={linksData?.websiteSwitch} onChange={handleInputChange} /></span> */}
                    </div>
                </div>
                <hr />
                <div className='flex items-center gap-8 mt-3'>
                    {/* <span className='font-semibold'>
                        Background color
                    </span>
                    <span>
                        <input value={linksData?.backgroundColor} onChange={handleInputChange} name='backgroundColor' type="color" />
                    </span> */}
                </div>
                <div className='w-full flex justify-end pt-2'>
                    <span onClick={handleSave} className='bg-slate-300 py-2 px-4 cursor-pointer'>Save</span>
                </div>
            </div>
        </div>
    );
}

export default LinksModal;
