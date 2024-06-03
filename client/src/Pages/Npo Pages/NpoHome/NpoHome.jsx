import React, { useEffect, useState } from 'react'
import DialogComponent from '../../../components/DialogComponent';
import VideoModal from './VideoModal';
import { useDispatch, useSelector } from 'react-redux';
import { setLinkData, setNpoData } from '../../../Redux/NpoSlices/NpoDataSlice';
import { FaEdit } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdCancel } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { LuDelete } from "react-icons/lu";
import insta from '../../../Assets/insta.png'
import facebook from '../../../Assets/Facebook_Logo_2023.png'
import ytLogo from '../../../Assets/Youtube_logo.png'
import LinksModal from './LinksModal';
import { toast } from 'react-toastify';

function NpoHome() {
    const NpoReduxData = useSelector((state) => state.NpoDataSlice);
    const [FinalData, setFinalData] = useState();
    const [logoUrl, setLogoUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState(NpoReduxData?.data?.bannerUrl || '');
    const [imageTextUrl, setImageTextUrl] = useState('');
    const [imageText, setImageText] = useState('');
    const [imageHeading, setImageHeading] = useState('');
    const [videoModalData, setVideoModalData] = useState('')
    const [richHeading, setRichHeading] = useState('')
    const [richBody, setRichBody] = useState('');
    const [linksData, setLinksData] = useState();
    const [emailData, setEmailData] = useState('');
    const [systmVideoData, setSystmVideoData] = useState('')
    const dispatch = useDispatch();

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [linksModalOpen, setLinksModalOpen] = useState(false);
    console.log(NpoReduxData.data);

    const handleLogoInput = (ev) => {

        // setLogoUrl(logoUrl)
        const file = ev?.target?.files[0];
        const newLogoUrl = URL?.createObjectURL(file);

        setLogoUrl(newLogoUrl);
    };

    const handleBannerInput = (ev) => {

        const file = ev?.target?.files[0];
        const newLogoUrl = URL?.createObjectURL(file);

        setBannerUrl(newLogoUrl);
    };

    const handleImagewithText = (ev) => {

        const file = ev?.target?.files[0];
        const newLogoUrl = URL?.createObjectURL(file);

        setImageTextUrl(newLogoUrl);
    };
    const handleImageTextInput = (ev) => {

        const val = ev?.target?.value;

        setImageText(val);
    };

    const handleVideoModalClose = (data) => {

        if (data) {
            console.log(data)

            if (data?.includes('embed')) {
                setVideoModalData(data)
            }
            else if (data?.includes('blob')) {
                setSystmVideoData(data)
            }

            else {

                const getYouTubeEmbedUrl = (url) => {
                    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
                    const match = url.match(youtubeRegex);
                    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
                };
                const youtubeEmbedUrl = getYouTubeEmbedUrl(data);
                setVideoModalData(youtubeEmbedUrl)
            }

        }
        setVideoModalOpen(false)
    }

    const handleSave = () => {
        let saveData = {
            logoUrl: logoUrl,
            bannerUrl: bannerUrl,
            imageTextUrl: imageTextUrl,
            imageText: imageText,
            imageHeading:imageHeading,
            videoData: videoModalData,
            richBody: richBody,
            emailData:emailData,
            richHeading: richHeading,
            linksData: {
                instagram: linksData?.instagram || '',
                facebook: linksData?.facebook || '',
                youtube: linksData?.youtube || '',
                instaSwitch: linksData?.instaSwitch || false,
                facebookSwitch: linksData?.facebookSwitch || false,
                youtubeSwitch: linksData?.youtubeSwitch || false
            }

        }
        if (saveData.logoUrl.trim() == '' || saveData.bannerUrl.trim() == '' || saveData.imageTextUrl.trim() == '' || saveData.imageText.trim() == ''
            || saveData.videoData.trim() == '' || saveData.richHeading.trim() == '' || saveData.richBody.trim() == '') {
            toast.error("Fill all the details first")
        }
        else {

            dispatch(setNpoData(saveData))
            console.log(saveData)
        }
    }

    const handleLinksModalClose = (data) => {

        if (data) {
            dispatch(setLinkData(data))
            setLinksData(data)
        }
        setLinksModalOpen(false)
    }
    console.log(linksData);

    const handleClearAll = () => {
        setLogoUrl('')
        setBannerUrl('')
        setEmailData('')
        setImageText('')
        setImageHeading('')
        setImageTextUrl('')
        setRichBody('')
        setRichHeading('')
        setVideoModalData('')
    }

    return (
        <div className='h-full   overflow-y-scroll w-full flex flex-col'>

            <div className=' w-full justify-end gap-2 flex px-12 pt-3'>
                <span onClick={() => handleClearAll()} className=' border cursor-pointer bg-slate-400 rounded hover:opacity-80 text-white px-3 py-2'>
                    Clear All
                </span>
                <span onClick={() => handleSave()} className=' border cursor-pointer bg-slate-400 rounded hover:opacity-80 text-white px-3 py-2'>
                    SAVE
                </span>
            </div>
            <div className='py-4 gap-1 flex justify-center '>
                <div className=' w-full mr-10 ml-1 my-1 h-fit gap-1 flex flex-col px-2 py-3 rounded border-2 border-slate-400'>
                    <div className=' relative'>
                        <span className=' absolute m-2 rounded-full  border'>
                            {
                                logoUrl ?
                                    <div className=' z-[1000] relative w-full h-full'>
                                        <img className='  border-4 border-black w-[70px] h-[70px]  rounded-full' src={logoUrl} alt="" />
                                        <span onClick={() => setLogoUrl('')} className=' absolute top-[-2px] right-0 text-red-500 cursor-pointer font-semibold  m-0'>X</span>
                                    </div>
                                    :
                                    <div className=' cursor-pointer p-[1px]  focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-500 border-2  rounded-full'> <input onInput={(e) => handleLogoInput(e)} accept='image/*' id='logoInput' type="file" className=' hidden w-0' />
                                        <label htmlFor='logoInput' className=' m-0 cursor-pointer  w-[70px] h-[70px] rounded-full bg-slate-400  flex items-center justify-center'>LOGO</label>
                                    </div>

                            }
                        </span>
                        {
                            bannerUrl && bannerUrl.length > 0
                                ?
                                <div className=' z-0  w-full '>
                                    <img className=' w-full object-cover h-[440px]' src={bannerUrl} alt="" />
                                    <span onClick={() => setBannerUrl('')} className=' cursor-pointer absolute text-red-500 top-[-11px] font-bold right-[-5px]'>X</span>
                                </div>
                                :
                                <div className=' flex  focus:border-2 p-1  focus:border-black focus:border-solid border-dashed border-slate-400 border-2 items-center justify-center bg-slate-300 w-full h-[435px]'>
                                    <div className=' p-[1px] py-[1px] focus:border-2 rounded focus:border-black focus:border-solid border-dashed border-slate-500 border-2'>
                                        <input onChange={(e) => handleBannerInput(e)} type="file" id='bannerInput' className=' w-0 hidden' accept='image/*' />
                                        <label htmlFor='bannerInput' className=' m-0 p-2 rounded cursor-pointer  bg-slate-400 '>Banner image</label>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className=' w-full justify-between flex '>
                        <div className='relative h-[350px] border-r-4 self-stretch items-center justify-center flex w-full bg-slate-300'>
                            {
                                imageTextUrl && imageTextUrl?.length > 0
                                    ?
                                    <div className='  h-full w-full'>
                                        <img className=' w-full h-full object-fill' src={imageTextUrl} alt="" />
                                        <span onClick={() => setImageTextUrl('')} className=' text-red-500  font-bold right-[-4px] top-[-10px] cursor-pointer absolute'>X</span>
                                    </div>
                                    :
                                    <div className=' w-full py-1  focus:border-2 h-full focus:border-black focus:border-solid border-dashed border-slate-400 border-2  flex items-center justify-center'>
                                        <div className=' rounded  focus:border-2 px-[1px] py-[1px] focus:border-black focus:border-solid border-dashed border-slate-500 border-2'>
                                            <input onInput={(e) => handleImagewithText(e)} id='imageWithText' type="file" accept='image/*' className=' w-0 hidden' />
                                            <label htmlFor='imageWithText' className=' m-0 bg-slate-400 p-2 rounded flex items-center justify-center  w-[118px] cursor-pointer'> Image</label>
                                        </div>
                                    </div>
                            }
                        </div>
                        <div className=' self-stretch flex-col justify-center  items-center flex gap-2 w-full bg-slate-300'>
                            <div className=' px-3 py-1 w-full flex flex-col gap-2 items-center'>
                                <span className=' relative flex-col gap-2 flex items-center  h-full py-2 justify-center w-full'>
                                    <input value={imageHeading} onInput={(e) => setImageHeading(e.target.value)} type="text" className=' py-2 focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 w-full border-2 px-2 outline-none bg-inherit ' placeholder='Heading' />
                                    {/* {
                                        imageHeading && imageHeading.length > 0
                                        &&
                                        <span onClick={() => setImageHeading('')} className=' cursor-pointer text-red-500 font-semibold absolute right-[-4px] top-[-2px]'>X</span>
                                    } */}
                                    
                                    <div className=' relative w-full'>

                                    <textarea onInput={(e) => handleImageTextInput(e)} value={imageText} type="text" placeholder='Text' className=' py-2  min-h-[250px]  m-auto w-full h-full flex bg-transparent items-center justify-center  focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 border-2  px-1 outline-none' />
                                    {/* {
                                        imageText && imageText.length > 0
                                        &&
                                        <span onClick={() => setImageText('')} className=' cursor-pointer text-red-500 font-semibold absolute right-[-4px] top-[-10px]'>X</span>
                                    } */}
                                    </div>
                                </span>
                                {/* <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis beatae libero iste, ad, dicta dolorum enim neque id quod qui itaque possimus.</span> */}
                            </div>
                        </div>
                    </div>
                    <div className=' w-full py-2  focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 border-2 items-center justify-center   flex  bg-slate-300 h-[450px]'>

                        {
                            systmVideoData && systmVideoData?.length > 0
                                ?
                                <>
                                    <div className='w-full relative flex justify-center py-1'>
                                        <video className=' w-full py-2 h-[440px]' controls>
                                            <source src={systmVideoData} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <span onClick={() => { setSystmVideoData('') }} className=' absolute cursor-pointer top-[-12px] right-[-6px] font-semibold text-red-500 text-lg'>X</span>

                                    </div>
                                </>
                                :
                                videoModalData?.length > 0 && videoModalData
                                    ?
                                    <div className=' relative w-full h-full'>
                                        <iframe className=' w-full h-full' src={videoModalData} title="YouTube video player" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" loop allow="accelerometer; loop; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                        <span onClick={() => { setVideoModalData('') }} className=' absolute cursor-pointer top-[-12px] right-[-6px] font-semibold text-red-500 text-lg'>X</span>
                                    </div>
                                    :

                                    <div className=' focus:border-2 rounded focus:border-black focus:border-solid border-dashed border-slate-500 border-2'>
                                        <label onClick={() => setVideoModalOpen(true)} className=' m-0 border-2 p-2 rounded cursor-pointer  bg-slate-400 '>Video section</label>
                                    </div>

                        }

                        <DialogComponent open={videoModalOpen} maxWidth={'sm'}>
                            <VideoModal close={handleVideoModalClose} />
                        </DialogComponent>
                    </div>
                    <div className=' w-full bg-slate-300 px-2 py-4 flex items-center justify-center'>
                        <div className=' w-full flex items-center justify-center flex-col gap-3'>
                            {/* <span>Heading</span> */}
                            <span className='relative w-[80%]'>
                                <input value={richHeading} onInput={(e) => setRichHeading(e.target.value)} type="text" className=' py-2 focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 w-full border-2 px-2 outline-none bg-inherit ' placeholder='Heading' />
                                {/* {
                                    richHeading && richHeading?.length > 0
                                    &&
                                    <span onClick={() => setRichHeading('')} className=' text-red-500 absolute top-[1px] right-[-26px] font-semibold cursor-pointer'><LuDelete size={21} /></span>
                                } */}
                            </span>
                            <div className=' w-[80%] relative' >
                                <textarea value={richBody} type="text" onInput={(e) => setRichBody(e.target.value)} placeholder='Text' className=' py-2 focus:border-2 w-full focus:border-black focus:border-solid border-slate-400 px-2 min-h-[200px] border-2 border-dashed flex items-center justify-center bg-inherit outline-none' />
                                {/* {
                                    richBody && richBody?.length > 0
                                    &&
                                    //    <span o className=' cursor-pointer absolute text-red-500 font-semibold top-[-8px] right-[-6px]'>X</span>
                                    <span onClick={() => setRichBody('')} className=' text-red-500 absolute top-[5px] right-[-26px] font-semibold cursor-pointer'><LuDelete size={21} /></span>

                                } */}
                            </div>

                        </div>
                    </div>
                    <div style={linksData?.backgroundColor ? { backgroundColor: linksData?.backgroundColor } : { backgroundColor: '#CBD5E1' }} className={` w-full flex-col  items-center gap-4 flex px-3 py-6 `}>
                        <div className=' w-full'>
                            <span className=' w-[100%] flex items-center justify-center'>
                                <div className='relative gap-2 flex items-center justify-center  flex-col w-1/3'>

                                    <span>Subscribe to our emails</span>
                                    <input value={emailData} onInput={(e) => setEmailData(e.target.value)} type="text" className=' py-2 focus:border-2  focus:border-black focus:border-solid border-dashed border-slate-400 w-full border-2 px-2 outline-none bg-inherit ' placeholder='Enter your email' />
                                    {/* {
                                        emailData && emailData?.length > 0
                                        &&
                                        <span onClick={() => setEmailData('')} className=' text-red-500 absolute top-[28px] right-[-26px] font-semibold cursor-pointer'><LuDelete size={21} /></span>
                                    } */}
                                </div>
                            </span>
                            <span className='  w-full flex justify-end cursor-pointer font-semibold' onClick={() => setLinksModalOpen(true)}>EDIT</span>
                        </div>
                        <div className=' w-full items-center flex justify-between'>
                            <div className=' flex  gap-4'>
                                <a className='' href={linksData?.contactUs || "#"}>
                                    <u>
                                        Contact Us
                                    </u>
                                </a>
                                <a className='' href={linksData?.websiteLink || "#"}>
                                    <u>
                                        Website Link
                                    </u>
                                </a>
                            </div>
                            <div className=' border-b h-12 flex items-center justify-center gap-1'>
                                {
                                    linksData?.instaSwitch != false
                                    &&
                                    <a href={linksData?.instagram || "https://www.instagram.com/"} target='_blank'>
                                        <img className=' w-[42px] h-[41px]' src={insta} alt="" />
                                    </a>
                                }
                                {
                                    linksData?.facebookSwitch != false
                                    &&
                                    <a href={linksData?.facebook || "https://www.facebook.com/"} target='_blank'>
                                        <img className=' w-fit h-[28px]' src={facebook} alt="" />
                                    </a>
                                }
                                {
                                    linksData?.youtubeSwitch != false
                                    &&
                                    <a href={linksData?.youtube || "https://www.youtube.com/"} target='_blank'>
                                        <img className=' w-fit h-[28px]' src={ytLogo} alt="" />
                                    </a>
                                }
                            </div>

                        </div>
                    </div>
                    <DialogComponent open={linksModalOpen} maxWidth={'md'}>
                        <LinksModal close={handleLinksModalClose} />
                    </DialogComponent>
                </div>
                {/* <div className=' w-1/3'>
            </div> */}
            </div>
        </div>
    )
}

export default NpoHome;