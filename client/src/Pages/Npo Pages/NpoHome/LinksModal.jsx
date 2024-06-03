import Switch from '@mui/material/Switch';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function LinksModal({ close }) {

    const NpoReduxData = useSelector((state) => state.NpoDataSlice.linksData);


    const [linksData, setLinksData] = useState({
        instagram: NpoReduxData?.instagram || '',
        facebook: NpoReduxData?.facebook ||  '',
        youtube: NpoReduxData?.youtube ||  '',
        contactUs:NpoReduxData?.contactUs || '',
        websiteLink:NpoReduxData?.websiteLink || '',
        backgroundColor:NpoReduxData?.backgroundColor || '#CBD5E1',
        instaSwitch: NpoReduxData?.instaSwitch ==false?false :true  ,
        facebookSwitch: NpoReduxData?.facebookSwitch==false?false:true ,
        youtubeSwitch: NpoReduxData?.youtubeSwitch==false?false:true    });

    const handleInputChange = (e) => {
        const { name} = e.target;
        let value;
        if(name=='instagram' || name=='backgroundColor'|| name =='facebook' || name=='youtube' || name=='contactUs' || name=='websiteLink')
            {
                value= e.target.value;
            }
        else
        {
            value = e.target.checked
        }
        setLinksData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        const { instagram, facebook, youtube } = linksData;
        if (!instagram.trim().length || !facebook.trim() || !youtube.trim()) {
            toast.error("All fields cannot be empty");
        } else {
            close(linksData);
        }
    };

    return (
        <div className='flex flex-col gap-8 py-2 w-full'>
            <div className='relative flex w-full justify-between'>
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
                <div className='flex gap-[67px] items-center'>
                    <span className='font-semibold'>{}Instagram</span>
                    <div className='w-full flex justify-between'>
                        <input
                            placeholder='Enter instagram link'
                            type="text"
                            name='instagram'
                            value={linksData?.instagram}
                            className='w-2/3 px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        <span>{linksData?.instaSwitch ? "Enabled":"Disabled"}: <Switch checked={linksData.instaSwitch} name='instaSwitch' onChange={handleInputChange} /></span>
                    </div>
                </div>
                <div className='flex gap-[71px] items-center'>
                    <span className='font-semibold'>Facebook</span>
                    <div className='w-full flex justify-between'>
                        <input
                            placeholder='Enter facebook link'
                            type="text"
                            name='facebook'
                            value={linksData?.facebook}
                            className='w-2/3 px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        <span>{linksData?.facebookSwitch ?"Enabled":"Disabled"}: <Switch name='facebookSwitch' checked={linksData?.facebookSwitch} onChange={handleInputChange} /></span>
                    </div>
                </div>
                <div className='flex gap-20 items-center'>
                    <span className='font-semibold'>Youtube</span>
                    <div className='w-full flex justify-between items-center'>
                        <input
                            placeholder='Enter youtube link'
                            type="text"
                            name='youtube'
                            value={linksData?.youtube}
                            className='w-2/3 px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        <span>{linksData?.youtubeSwitch ? "Enabled":"Disabled"}: <Switch name='youtubeSwitch' checked={linksData?.youtubeSwitch} onChange={handleInputChange} /></span>
                    </div>
                </div>
                <div className='flex gap-[82px] items-center'>
                    <span className='font-semibold'>Contact</span>
                    <div className='w-full flex justify-between items-center'>
                        <input
                            placeholder='Enter contact link'
                            type="text"
                            name='contactUs'
                            value={linksData?.contactUs}
                            className='w-2/3 px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        <span>{ "Enabled"}: <Switch disabled name='contactSwitch' checked={true} /></span>
                    </div>
                </div>
                <div className='flex gap-[62px] items-center'>
                    <span className='font-semibold w-24'>Site link</span>
                    <div className='w-full flex justify-between items-center'>
                        <input
                            placeholder='Enter website link'
                            type="text"
                            name='websiteLink'
                            value={linksData?.websiteLink}
                            className='w-2/3 px-2 py-2 border outline-none'
                            onChange={handleInputChange}
                        />
                        <span>{ "Enabled"}: <Switch disabled name='websiteLink' checked={true} /></span>
                    </div>
                </div>
                <hr />
                <div className=' flex items-center gap-8 mt-3'>
                    <span className=' font-semibold'>
                        Background color
                    </span>
                    <span>
                        <input value={linksData?.backgroundColor} onChange={handleInputChange} name='backgroundColor' type="color" />
                    </span>
                </div>
                <div className='w-full flex justify-end pt-2'>
                    <span onClick={handleSave} className='bg-slate-300 py-2 px-4 cursor-pointer'>Save</span>
                </div>
            </div>
        </div>
    );
}

export default LinksModal;
