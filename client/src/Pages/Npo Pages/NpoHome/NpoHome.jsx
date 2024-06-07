import React, { useEffect, useState } from 'react'
import DialogComponent from '../../../components/DialogComponent';
import VideoModal from './VideoModal';
import { useDispatch, useSelector } from 'react-redux';
import { setLinkData, setNpoData, setPreviewData } from '../../../Redux/NpoSlices/NpoDataSlice';
import { FaEdit } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdCancel } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { LuDelete } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import insta from '../../../Assets/insta.png'
import facebook from '../../../Assets/Facebook_Logo_2023.png'
import ytLogo from '../../../Assets/Youtube_logo.png'
import LinksModal from './LinksModal';
import { toast } from 'react-toastify';
import { json, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { useAddPageMutation, useGetPageByIdQuery, useUploadFileMutation } from '../../../services/NpoPageService';
import { VscLoading } from 'react-icons/vsc';

function NpoHome() {
    const NpoReduxData = useSelector((state) => state.NpoDataSlice);
    const [loading, setLoading] = useState(false);
    const [FinalData, setFinalData] = useState();
    const [decodedToken, setDecodedToken] = useState('');
    const [IMG, setImg] = useState('');
    const [logoLoading, setLogoLoading] = useState(false);
    const [bannerLoading, setBannerLoading] = useState(false);
    const [TextImageloading, setTextImageLoading] = useState(false);
    const LocalNpoPreviewData = localStorage.getItem('previewData');
    const [localNpoPreviewDataState, setlocalNpoPreviewDataState] = useState('')



    useEffect(() => {
        if (LocalNpoPreviewData) {
            setlocalNpoPreviewDataState(JSON.parse(LocalNpoPreviewData))
        }
    }, [LocalNpoPreviewData])

    /* Getting PageData using Api by Id */


    const { data: NpoPagedata, isFetching: ispageDataFetching, isLoading: ispageDataLoading } = useGetPageByIdQuery({ Id: decodedToken?.id || '0' })

    useEffect(() => {
        if (ispageDataFetching || ispageDataLoading) {
            setLoading(true)
        }
        else {
            setLoading(false);
            console.log(NpoPagedata?.result?.pageJson)
            setFinalData(NpoPagedata?.result?.pageJson ? JSON.parse(NpoPagedata?.result?.pageJson) : null)
        }
    }, [NpoPagedata, ispageDataFetching, ispageDataLoading])

    console.log(FinalData)

    /* Getting ImageFile data using Api by */
    // const {data:logoImageData,isFetching:isLogoDataFetching,isLoading:isLogoDataLoading} = useGetFileQuery({Id:6,type:'logo'});

    //////////////////////////////////////////////////////////////////////////
    const fetchLogoData = () => {
        setLogoLoading(true)
        const config = {
            method: "POST"
        };
        setLoading(true)
        fetch(`http://192.168.1.61:8080/api/v1/npos/image/${decodedToken?.id}?type=logo`, config)
            .then(response => {
                if (!response?.ok) {
                    throw new Error('Image not found');
                }
                console.log(response);
                return response?.blob();
            })
            .then(blob => {
                console.log(blob);
                const imgURL = blob ? URL.createObjectURL(blob) : '';
                console.log(imgURL);
                setLogoUrl(localNpoPreviewDataState?.logoUrl?.length > 0 ? localNpoPreviewDataState?.logoUrl : imgURL);
                console.log(blob, "res");
                setLoading(false);
                setLogoLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setLogoLoading(false)
            });
    };

    useEffect(() => {
        if (decodedToken?.id) {

            fetchLogoData()
        }
    }, [decodedToken]);

    ///////////////////////////////////////////////////////////////////////////////////////////
    const fetchBannerImgData = () => {
        const config = {
            method: "POST"
        };
        setLoading(true);
        setBannerLoading(true);

        fetch(`http://192.168.1.61:8080/api/v1/npos/image/${decodedToken?.id}?type=banner`, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Image not found');
                }
                return response.blob();
            })
            .then(blob => {
                const imgURL = blob ? URL.createObjectURL(blob) : '';
                setBannerUrl(localNpoPreviewDataState?.bannerUrl?.length > 0 ? localNpoPreviewDataState?.bannerUrl : imgURL);
                console.log(blob, "res");
                setLoading(false);
                setBannerLoading(false)
            })
            .catch(err => {
                setLoading(false);
                setBannerLoading(false)
            });
    };


    useEffect(() => {
        if (decodedToken?.id) {

            fetchBannerImgData()
        }
    }, [decodedToken])

    //////////////////////////////////////////////////////////////////////////////

    const fetchTextImgData = () => {
        const config = {
            method: "POST"
        };
        setLoading(true)
        setTextImageLoading(true);
        fetch(`http://192.168.1.61:8080/api/v1/npos/image/${decodedToken?.id}?type=text`, config)
            .then(response => {
                if (!response?.ok) {
                    throw new Error('Image not found');
                }
                return response?.blob();
            })
            .then(blob => {
                const imgURL = blob ? URL.createObjectURL(blob) : '';
                setImageTextUrl(localNpoPreviewDataState?.imageTextUrl?.length > 0 ? localNpoPreviewDataState?.imageTextUrl : imgURL);
                console.log(blob, "res");
                setLoading(false);
                setTextImageLoading(false)
            })
            .catch(err => {
                setLoading(false);
                setTextImageLoading(false)
            });
    };

    useEffect(() => {
        if (decodedToken?.id) {
            fetchTextImgData()

        }
    }, [decodedToken])


    useEffect(() => {
        setImageHeading(FinalData?.imageHeading)
        setImageText(FinalData?.imageText);
        setVideoModalData(FinalData?.videoData);
        setRichHeading(FinalData?.richHeading);
        setRichBody(FinalData?.richBody);
        setBannerBackgroundText(FinalData?.bannerBackgroundText);
        setEmailData(FinalData?.emailData);

    }, [FinalData, localNpoPreviewDataState])

    const [logoUrl, setLogoUrl] = useState(NpoReduxData?.data?.logoUrl || '');
    const [bannerUrl, setBannerUrl] = useState(NpoReduxData?.data?.bannerUrl || '');
    const [bannerBackgroundText, setBannerBackgroundText] = useState(localNpoPreviewDataState?.bannerBackgroundText || FinalData?.bannerBackgroundText || '')
    const [imageTextUrl, setImageTextUrl] = useState(NpoReduxData?.data?.imageTextUrl || '');
    const [imageText, setImageText] = useState(NpoReduxData?.data?.imageText || '');
    const [videoModalData, setVideoModalData] = useState(FinalData?.imageText || '')
    const [richHeading, setRichHeading] = useState(NpoReduxData?.data?.richHeading || '')
    const [richBody, setRichBody] = useState(NpoReduxData?.data?.richBody || '');
    const [emailData, setEmailData] = useState(NpoReduxData?.data.emailData || '');
    const [systmVideoData, setSystmVideoData] = useState(NpoReduxData?.data.systmVideoData || '')
    const cookieData = Cookies.get('NpoAuthLogin');
    const [imageHeading, setImageHeading] = useState(localNpoPreviewDataState?.imageHeading || FinalData?.imageHeading || '');
    const [linksData, setLinksData] = useState();
    const [logoFormData, setLogoFormData] = useState(null);
    const [bannerFormData, setBannerFormData] = useState(null);
    const [textFormData, setTextFormData] = useState(null);



    const [AddPage] = useAddPageMutation();
    const [UploadFile] = useUploadFileMutation();

    useEffect(() => {
        setImageHeading(localNpoPreviewDataState?.imageHeading || FinalData?.imageHeading)
        setImageText(localNpoPreviewDataState?.imageText || FinalData?.imageText);
        setVideoModalData(localNpoPreviewDataState?.videoData || FinalData?.videoData);
        setRichHeading(localNpoPreviewDataState?.richHeading || FinalData?.richHeading);
        setRichBody(localNpoPreviewDataState?.richBody || FinalData?.richBody);
        setEmailData(localNpoPreviewDataState?.emailData || FinalData?.emailData);
        setLogoUrl(localNpoPreviewDataState?.logoUrl || logoUrl);
        setBannerUrl(localNpoPreviewDataState?.bannerUrl || bannerUrl);
        setImageTextUrl(localNpoPreviewDataState?.imageTextUrl || imageTextUrl);
        setBannerBackgroundText(localNpoPreviewDataState?.bannerBackgroundText || FinalData?.bannerBackgroundText)
    }, [localNpoPreviewDataState, FinalData])

    useEffect(() => {
        if (cookieData?.length > 0) {
            const DecodedData = jwtDecode(cookieData);
            setDecodedToken(DecodedData);
        }
    }, [cookieData]);

    useEffect(() => {
        console.log(decodedToken)
    }, [decodedToken])

    const dispatch = useDispatch();

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [linksModalOpen, setLinksModalOpen] = useState(false);

    console.log(NpoReduxData?.data);
    const navigate = useNavigate()

    /* Logo ImageUplaod handle*/
    const handleLogoInput = (ev) => {
        // setLogoUrl(logoUrl)
        const file = ev?.target?.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const newLogoUrl = file ? URL?.createObjectURL(file) : '';
        setLogoUrl(newLogoUrl);
        setLogoFormData(formData)

    };


    /* Banner Image upload handle */
    const handleBannerInput = (ev) => {
        const file = ev?.target?.files[0];
        const newLogoUrl = URL?.createObjectURL(file);
        const formData = new FormData();
        formData.append('image', file);
        setBannerUrl(newLogoUrl);
        setBannerFormData(formData)
        // UploadFile({ Id: decodedToken?.id, data: formData, type: 'banner' })
        //     .then((res) => {
        //         if (res?.error) {
        //             toast.error(res?.error?.data?.message);
        //             setBannerUrl('')
        //         }
        //         else {
        //             console.log(res);

        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })


    };

    /* Handle Image with text upload */
    const handleImagewithText = (ev) => {

        const file = ev?.target?.files[0];
        const formData = new FormData();

        formData.append('image', file);
        const newLogoUrl = URL?.createObjectURL(file);
        setImageTextUrl(newLogoUrl)
        setTextFormData(formData)
        // UploadFile({ Id: decodedToken?.id, data: formData, type: 'text' })
        //     .then((res) => {
        //         if (res?.error) {
        //             toast.error(res?.error?.data?.message);
        //             console.log(res?.error)
        //         }
        //         else {
        //             console.log(res);
        //             setImageTextUrl(newLogoUrl);

        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })


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

        let DataForApi = {
            logoUrl: logoUrl,
            bannerUrl: bannerUrl,
            bannerBackgroundText: bannerBackgroundText,
            imageTextUrl: imageTextUrl,
            imageText: imageText,
            imageHeading: imageHeading,
            videoData: systmVideoData ? systmVideoData : videoModalData,
            richBody: richBody,
            emailData: emailData,
            richHeading: richHeading,
            linksData: {
                instagram: {
                    link: linksData?.instagram || FinalData?.linksData?.instagram?.link,
                    show: linksData?.instaSwitch || FinalData?.linksData?.instagram?.show
                },
                facebook: {
                    link: linksData?.facebook || FinalData?.linksData?.facebook?.link,
                    show: linksData?.facebookSwitch || FinalData?.linksData?.facebook?.show
                },
                youtube: {
                    link: linksData?.youtube || FinalData?.linksData?.youtube?.link,
                    show: linksData?.youtubeSwitch || FinalData?.linksData?.youtube?.show

                },
                contactUs: {
                    link: linksData?.contactUs || FinalData?.linksData?.contactUs?.link,
                    show: linksData?.contactSwitch || FinalData?.linksData?.contactUs?.show
                },
                websiteLink: {
                    link: linksData?.websiteLink || FinalData?.linksData?.websiteLink?.link,
                    show: linksData?.websiteSwitch || FinalData?.linksData?.websiteLink?.show
                }
            }
        }
        console.log(DataForApi, "%%%")

        if (
            DataForApi?.logoUrl == '' || DataForApi?.bannerUrl == '' || DataForApi?.imageTextUrl == '' ||
            DataForApi?.imageText == ''
            || DataForApi?.videoData == '' || DataForApi?.richHeading == '' || DataForApi?.richBody == '' || DataForApi?.emailData == ''
            || DataForApi?.logoUrl == undefined || DataForApi?.bannerUrl == undefined || DataForApi?.imageTextUrl == undefined || DataForApi?.imageText == undefined
            || DataForApi?.videoData == undefined || DataForApi?.richHeading == undefined || DataForApi?.richBody == undefined || DataForApi?.emailData == undefined
        ) {
            toast.error("Fill all the details first")
        }
        else {
            UploadFile({ Id: decodedToken?.id, data: textFormData, type: 'text' })
                .then((res) => {
                    if (res?.error) {
                        toast.error(res?.error?.data?.message);
                        console.log(res?.error);
                        setImageTextUrl('')
                    }
                    else {
                        console.log(res);

                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            UploadFile({ Id: decodedToken?.id, data: bannerFormData, type: 'banner' })
                .then((res) => {
                    if (res?.error) {
                        toast.error(res?.error?.data?.message);
                        setBannerUrl('')
                    }
                    else {
                        console.log(res);

                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            UploadFile({ Id: decodedToken?.id, data: logoFormData, type: 'logo' })
                .then((res) => {
                    if (res?.error) {
                        toast.error(res?.error?.data?.message);
                        console.log(res?.error)
                    }
                    else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
            AddPage({ Id: decodedToken?.id, data: DataForApi })
                .then((res) => {
                    console.log(res);
                    if (res.error) {
                        toast.error('An Error Occured')
                    }
                    else {
                        dispatch(setNpoData(DataForApi));
                        dispatch(setLinkData(linksData));
                        toast.success(res.data.message);
                        localStorage.setItem('previewData', JSON.stringify(DataForApi));

                    }
                })
                .catch((err) => {
                    console.log(err, "-----------------")
                    toast.error("Error")
                })
            console.log(DataForApi)
        }

    }

    const handleLinksModalClose = (data) => {

        if (data) {
            dispatch(setLinkData(data))
            setLinksData(data)
        }
        setLinksModalOpen(false)
    }

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
        setBannerBackgroundText('')
    }

    const handlePreviewPage = () => {
        /*  Previous Imp Data */

        // console.log(NpoReduxData?.data)
        // console.log(FinalData)
        // FinalData == '' || FinalData == undefined ?
        //     toast.error('Page details incomplete')
        //     :
        //     navigate('/page/preview')

        let DataForRedux = {
            logoUrl: logoUrl,
            bannerUrl: bannerUrl,
            bannerBackgroundText: bannerBackgroundText,
            imageTextUrl: imageTextUrl,
            imageText: imageText,
            imageHeading: imageHeading,
            videoData: systmVideoData ? systmVideoData : videoModalData,
            richBody: richBody,
            emailData: emailData,
            richHeading: richHeading,
            linksData: {
                instagram: {
                    link: linksData?.instagram || FinalData?.linksData?.instagram?.link,
                    show: linksData?.instaSwitch || FinalData?.linksData?.instagram?.show
                },
                facebook: {
                    link: linksData?.facebook || FinalData?.linksData?.facebook?.link,
                    show: linksData?.facebookSwitch || FinalData?.linksData?.facebook?.show
                },
                youtube: {
                    link: linksData?.youtube || FinalData?.linksData?.youtube?.link,
                    show: linksData?.youtubeSwitch || FinalData?.linksData?.youtube?.show

                },
                contactUs: {
                    link: linksData?.contactUs || FinalData?.linksData?.contactUs?.link,
                    show: linksData?.contactSwitch || FinalData?.linksData?.contactUs?.show
                },
                websiteLink: {
                    link: linksData?.websiteLink || FinalData?.linksData?.websiteLink?.link,
                    show: linksData?.websiteSwitch || FinalData?.linksData?.websiteLink?.show
                }
            }
        };

        localStorage.setItem('previewData', JSON.stringify(DataForRedux));
        dispatch(setPreviewData(DataForRedux));

        navigate('/page/preview')


    }

    const handleCall = (number) => {
        window.open(`tel:${number}`, '_blank');
    }

    return (
        <div className='h-full relative   overflow-y-scroll w-full flex flex-col'>

            <div className=' fixed z-50 right-0 top-[75px] gap-2 flex px-12 pt-3'>
                <span onClick={() => handlePreviewPage()} className=' border cursor-pointer bg-slate-500 rounded hover:opacity-90 text-white px-3 py-2'>
                    Preview Page
                </span>
                <span onClick={() => handleClearAll()} className=' border cursor-pointer bg-slate-500 rounded hover:opacity-90 text-white px-3 py-2'>
                    Clear All
                </span>
                <span onClick={() => handleSave()} className=' border cursor-pointer bg-slate-500 rounded hover:opacity-90 text-white px-3 py-2'>
                    SAVE
                </span>
            </div>
            {
                loading || TextImageloading || logoLoading || bannerLoading ?
                    <div className=' flex items-center justify-center w-full  flex-col  pt-12 px-12'>
                        {/* loading  . . */}
                        <span className='flex mt-28 drop-shadow-sm mr-14 w-full items-center px-2 justify-center py-1'> <span className=' py-1 px-[15.5px] animate-spin'><VscLoading size={28} /></span>
                        </span>
                    </div>
                    :
                    <div className='py-4 mt-9 gap-1 flex justify-center '>
                        <div className=' w-full mr-10 ml-1 my-1 h-fit gap-1 flex flex-col px-2 py-3 rounded border-2 border-slate-400'>
                            <div className=' relative'>
                                <span className=' absolute m-2 rounded-full  border'>
                                    {
                                        logoUrl && logoUrl?.length > 0 ?
                                            <div className=' z-[1000] relative w-full h-full'>
                                                <img className='  border-4 border-black w-[70px] h-[70px]  rounded-full' src={logoUrl} alt="" />
                                                <input onInput={(e) => handleLogoInput(e)} accept='image/*' id='logoInput' type="file" className=' hidden w-0' />
                                                <label htmlFor='logoInput' className=' absolute top-[-2px] right-[-5px] font-bold text-black bg-slate-200 p-[1.5px] flex items-center justify-center cursor-pointer   m-0'><FaRegEdit /></label>
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
                                        <div className=' z-0   w-full overflow-hidden '>
                                            <img className=' w-full object-cover h-[480px]' src={bannerUrl} alt="" />
                                            <input onChange={(e) => handleBannerInput(e)} type="file" id='bannerInput' className=' w-0 hidden' accept='image/*' />
                                            <span className=' w-full absolute top-[200px] flex items-center  justify-center left-[0px] self-center'>
                                                <input value={bannerBackgroundText} onInput={(e) => setBannerBackgroundText(e.target.value)} type="text" className=' text-center  backdrop-blur-md w-1/2 font-bold placeholder-slate-200 text-xl text-white py-2 focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 border-2 px-2 outline-none bg-inherit placeholder:font-normal' placeholder='TYPE YOUR CONTENT HERE' />
                                            </span>
                                            <label htmlFor='bannerInput' className=' m-0  z-10  cursor-pointer absolute text-black p-[2px] top-[-10px] font-bold bg-slate-200  right-[-7px]'><FaRegEdit /></label>
                                        </div>
                                        :
                                        <div className=' flex  focus:border-2 p-1  focus:border-black focus:border-solid border-dashed border-slate-400 border-2 items-center justify-center bg-slate-300 w-full h-[475px]'>
                                            <div className=' p-[1px] py-[1px] focus:border-2 rounded focus:border-black focus:border-solid border-dashed border-slate-500 border-2'>
                                                <input onChange={(e) => handleBannerInput(e)} type="file" id='bannerInput' className=' w-0 hidden' accept='image/*' />
                                                <label htmlFor='bannerInput' className=' m-0 p-2 rounded cursor-pointer  bg-slate-400 '>Banner image</label>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className=' w-full justify-between  flex-col md:flex-row flex  '>
                                <div className='relative h-[350px] border-r-4 self-stretch items-center justify-center flex w-full bg-slate-300'>
                                    {
                                        imageTextUrl && imageTextUrl?.length > 0
                                            ?
                                            <div className='  h-full w-full'>
                                                <img className=' w-full h-full object-fill' src={imageTextUrl} alt="" />
                                                <input onInput={(e) => handleImagewithText(e)} id='imageWithText' type="file" accept='image/*' className=' w-0 hidden' />
                                                <label htmlFor={'imageWithText'} className=' text-black m-0  font-bold bg-slate-200 p-[1px] right-[-4px] top-[-10px] cursor-pointer absolute'><FaRegEdit /></label>
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
                                            <input value={imageHeading} onInput={(e) => setImageHeading(e.target.value)} type="text" className='font-semibold placeholder-opacity-70 placeholder-slate-400 py-2 focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 w-full border-2 px-2 outline-none bg-inherit placeholder:font-normal' placeholder='Heading' />
                                            {/* {
                                        imageHeading && imageHeading.length > 0
                                        &&
                                        <span onClick={() => setImageHeading('')} className=' cursor-pointer text-red-500 font-semibold absolute right-[-4px] top-[-2px]'>X</span>
                                    } */}

                                            <div className=' relative w-full'>

                                                <textarea onInput={(e) => handleImageTextInput(e)} value={imageText} type="text" placeholder='Text' className=' py-2  min-h-[250px]  m-auto w-full h-full flex bg-slate-300 items-center justify-center  focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 border-2  px-1 outline-none' />
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
                            <div className=' w-full py-0  focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 border-2 items-center justify-center   flex  bg-slate-300 h-[450px]'>

                                {
                                    systmVideoData && systmVideoData?.length > 0
                                        ?
                                        <>
                                            <div className='w-full relative flex justify-center py-0'>
                                                <video className=' w-full py-0 h-[440px]' controls>
                                                    <source src={systmVideoData} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                <span onClick={() => setVideoModalOpen(true)} className=' absolute top-[-2px] right-[-5px] font-bold text-black bg-slate-200 p-[1.5px] flex items-center justify-center cursor-pointer   m-0'><FaRegEdit /></span>
                                            </div>
                                        </>
                                        :
                                        videoModalData?.length > 0 && videoModalData
                                            ?
                                            <div className=' relative w-full h-full'>
                                                <iframe className=' w-full h-full' src={videoModalData} title="YouTube video player" referrerPolicy="strict-origin-when-cross-origin" loop allow="accelerometer; loop; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                <span onClick={() => { setVideoModalOpen(true) }} className=' absolute cursor-pointer bg-slate-200 top-[-12px] right-[-9.4px] font-semibold text-black text-lg'><FaRegEdit /></span>
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
                                        <input value={richHeading} onInput={(e) => setRichHeading(e.target.value)} type="text" className=' py-2 font-semibold placeholder-opacity-75 placeholder-slate-400 focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 w-full border-2 px-2 outline-none bg-inherit placeholder:font-normal' placeholder='Heading' />
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
                            <div style={linksData?.backgroundColor ? { backgroundColor: linksData?.backgroundColor } : { backgroundColor: '#CBD5E1' }} className={` w-full flex-col  items-center gap-4 flex px-3 pb-4 pt-2 `}>
                                <div className=' w-full'>
                                    <span className='  w-full flex justify-end font-semibold'><span className='  cursor-pointer' onClick={() => setLinksModalOpen(true)}>EDIT</span></span>
                                    <span className=' py-3 w-[100%] flex items-center justify-center'>
                                        <div className='relative gap-2 flex items-center justify-center  w-full md:w-1/3'>
                                            <div className=' flex flex-col gap-2 w-full items-center'>

                                                <span>Reach Us Through Our Email : </span>
                                                <input value={emailData} onInput={(e) => setEmailData(e.target.value)} type="text" className=' py-2 focus:border-2  focus:border-black focus:border-solid border-dashed border-slate-400 w-full border-2 px-2 outline-none bg-inherit ' placeholder='Enter  email' />
                                            </div>
                                            {/* {
                                        emailData && emailData?.length > 0
                                        &&
                                        <span onClick={() => setEmailData('')} className=' text-red-500 absolute top-[28px] right-[-26px] font-semibold cursor-pointer'><LuDelete size={21} /></span>
                                    } */}
                                        </div>
                                    </span>
                                </div>
                                <div className=' w-full items-center flex flex-col md:flex-row justify-between'>
                                    <div className=' flex flex-col  gap-3'>

                                        <span className='' onClick={() => handleCall(linksData?.contactUs)} >
                                            <span className=' flex'>
                                                <span>
                                                    Contact Us
                                                </span>
                                                <span className=' pl-4'>

                                                    :
                                                </span>
                                                <span className=' pl-[30px] cursor-pointer'>

                                                    {linksData?.contactUs || localNpoPreviewDataState?.linksData?.contactUs?.link || FinalData?.linksData?.contactUs?.link}
                                                </span>
                                            </span>
                                        </span>
                                        <span className=' flex'>
                                            Website Link
                                            <span className=' pl-[13px]'>

                                                :
                                            </span>
                                            <span className=' pl-[27px]'>

                                                <a className='' href={linksData?.websiteLink || "#"}>
                                                    <span>
                                                        {linksData?.websiteLink || FinalData?.linksData?.websiteLink?.link}
                                                    </span>
                                                </a>
                                            </span>
                                        </span>
                                    </div>
                                    <div className=' border-b h-11 mt-3 flex items-center justify-center gap-2'>
                                        {/* {
                                    linksData?.instaSwitch != false
                                    &&
                                    } */}
                                        <a href={linksData?.instagram || "https://www.instagram.com/"} target='_blank'>
                                            <img className=' w-[42px] h-[41px]' src={insta} alt="" />
                                        </a>
                                        {/* {
                                    linksData?.facebookSwitch != false
                                }
                                    && */}
                                        <a href={linksData?.facebook || "https://www.facebook.com/"} target='_blank'>
                                            <img className=' w-fit h-[28px]' src={facebook} alt="" />
                                        </a>
                                        {/* {
                                    linksData?.youtubeSwitch != false
                                    &&
                                    } */}
                                        <a href={linksData?.youtube || "https://www.youtube.com/"} target='_blank'>
                                            <img className=' w-fit h-[28px]' src={ytLogo} alt="" />
                                        </a>
                                    </div>

                                </div>
                            </div>
                            <DialogComponent open={linksModalOpen} maxWidth={'md'}>
                                <LinksModal data={FinalData} close={handleLinksModalClose} />
                            </DialogComponent>
                        </div>
                        {/* <div className=' w-1/3'>
            </div> */}
                    </div>
            }

        </div>
    )
}

export default NpoHome;