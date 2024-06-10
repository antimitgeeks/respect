import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import insta from '../../../Assets/insta.png'
import facebook from '../../../Assets/Facebook_Logo_2023.png'
import ytLogo from '../../../Assets/Youtube_logo.png'
import { useGetPageByIdQuery } from '../../../services/NpoPageService';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
// import { IoArrowBack } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function NpoPreview({ Id }) {

    const navigate = useNavigate();
    const [PageData, setPageData] = useState();
    const [loading, setLoading] = useState(false)
    const [decodedToken, setDecodedToken] = useState('');
    const ReduxPreviewData = useSelector((state) => state.NpoDataSlice.PreviewData);

    console.log(ReduxPreviewData)

    const { data: NpoPagedata, isFetching: ispageDataFetching, isLoading: ispageDataLoading } = useGetPageByIdQuery({ Id: Id || decodedToken?.id })

    const cookieData = Cookies.get('NpoAuthLogin');
    const [logoUrl, setLogoUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [imageTextUrl, setImageTextUrl] = useState('')

    useEffect(() => {
        if (ispageDataFetching || ispageDataLoading) {
            setLoading(true)
        }
        else {
            setLoading(false);
            setPageData(NpoPagedata?.result?.pageJson ? JSON.parse(NpoPagedata?.result?.pageJson) : null)
        }
    }, [NpoPagedata, ispageDataFetching, ispageDataLoading])


    useEffect(() => {
        if (cookieData?.length > 0) {
            const DecodedData = cookieData ? jwtDecode(cookieData) : '';
            setDecodedToken(DecodedData);
        }
    }, [cookieData]);

    useEffect(() => {

        console.log(PageData)
    }, [PageData])


    const handleRedirectEmail = (email) => {
        const emailServiceUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`; // Replace with your email service URL
        // const mailtoUrl = `mailto:${email}`;
        window.open(emailServiceUrl, '_blank');
    }

    const handleCall = (number) => {
        const tell = `tel:${number}`;

        window.open(tell, '_blank');
    }


    /* functions for image get */
    const fetchLogoData = () => {
        console.log('----------------------------------------api calling');
        const config = {
            method: "GET"
        };

        fetch(`http://192.168.1.61:8080/api/v1/npos/image/${Id || decodedToken?.id}?type=logo`, config)
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
                setLogoUrl(imgURL);
                console.log(blob, "res");
            })
            .catch(err => {
            });
    };
    useEffect(() => {
        if (decodedToken?.id || Id) fetchLogoData()
    }, [decodedToken]);

    ///////////////////////////////////////////////////////////////////////////////////////////
    const fetchBannerImgData = () => {
        const config = {
            method: "GET"
        };

        fetch(`http://192.168.1.61:8080/api/v1/npos/image/${Id || decodedToken?.id}?type=banner`, config)
            .then(response => {
                if (!response?.ok) {
                    throw new Error('Image not found');
                }
                return response?.blob();
            })
            .then(blob => {
                const imgURL = blob ? URL.createObjectURL(blob) : '';
                setBannerUrl(imgURL);
                console.log(blob, "res");
            })
            .catch(err => {
            });
    };

    useEffect(() => {
        if (decodedToken?.id || Id) fetchBannerImgData()
    }, [decodedToken])

    //////////////////////////////////////////////////////////////////////////////

    const fetchTextImgData = () => {
        const config = {
            method: "GET"
        };
        console.log(Id, 'IDDDDDDDDDDDDDDDDDDDDDDDDD')
        fetch(`http://192.168.1.61:8080/api/v1/npos/image/${Id ? Id : decodedToken?.id}?type=text`, config)
            .then(response => {
                if (!response?.ok) {
                    throw new Error('Image not found');
                }
                return response?.blob();
            })
            .then(blob => {
                const imgURL = blob ? URL.createObjectURL(blob) : '';
                setImageTextUrl(imgURL);
                console.log(blob, "res");
            })
            .catch(err => {
            });
    };
    useEffect(() => {
        if (decodedToken?.id || Id) fetchTextImgData()
    }, [decodedToken])



    return (
        <div className=' flex flex-col gap-2 pb-3 relative  w-full h-full'>
            {
                Id && !PageData ?
                    <>
                        <span className=' w-full flex items-center justify-center font-semibold'> No Data Found      </span>
                    </>
                    :
                    <>
                        {
                            !Id &&
                            <div onClick={() => navigate('/dashboard')} className=' w-fit z-10  fixed right-4 hover:opacity-95 top-4 bg-[#f49a86] px-3 rounded cursor-pointer py-2'>
                                <span className=' cursor-pointer flex gap-2 items-center'> <MdKeyboardBackspace size={20} />Back</span>
                            </div>
                        }
                        <div className=' relative w-full  '>
                            <div className=' py-3 px-3 w-full absolute'>
                                {
                                    logoUrl || ReduxPreviewData?.logoUrl ?
                                        <>
                                            <img className=' w-[70px] h-[70px] rounded-full' src={ReduxPreviewData?.logoUrl || logoUrl} alt="" />
                                        </>
                                        :
                                        <div className=' bg-slate-400 h-[70px] w-[70px] rounded-full'>

                                        </div>
                                }
                            </div>
                            <div className=' w-full h-[580px]'>
                                {
                                    bannerUrl || ReduxPreviewData?.bannerUrl ?
                                        <div className=' w-full h-full'>
                                            <img className=' object-cover object-center h-full w-full' src={ReduxPreviewData?.bannerUrl || bannerUrl} alt="" />
                                            <span className=' absolute top-[250px] text-white w-full flex items-center justify-center'>
                                                <span style={{ color: ReduxPreviewData?.bannerTextColor || PageData?.bannerTextColor }} className=' w-full px-16 break-words text-center text-slate-50 text-[30px] rounded py-1'>
                                                    {ReduxPreviewData?.bannerBackgroundText || PageData?.bannerBackgroundText}
                                                </span>
                                            </span>
                                        </div>
                                        :
                                        <div className=' bg-slate-300  w-full h-full'>

                                        </div>
                                }
                            </div>
                        </div>
                        <div className='w-full gap-1 flex px-3'>
                            <div className='w-1/2 self-stretch min-h-[320px] h-full px-1 py-1'>
                                {
                                    imageTextUrl || ReduxPreviewData?.imageTextUrl ?
                                        <img className='rounded self-stretch h-full w-full object-cover' src={ReduxPreviewData?.imageTextUrl || imageTextUrl} alt="" />
                                        :
                                        <div className='bg-slate-300 min-h-[400px] rounded h-full w-full'>
                                        </div>
                                }
                            </div>
                            <div className='w-1/2  self-stretch  border my-1 px-3 rounded mr-1 flex items-center justify-center'>
                                <div className='w-full flex flex-col gap-3 items-center'>
                                    <span className='font-semibold text-xl mb-2'>{ReduxPreviewData?.imageHeading || PageData?.imageHeading}</span>
                                    <span className='w-full text-center  h-auto overflow-hidden whitespace-pre-wrap break-words'>
                                        {ReduxPreviewData?.imageText || PageData?.imageText}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className=' w-full h-[560px] px-20 py-3'>
                            {
                                ReduxPreviewData?.videoData || PageData?.videoData ?
                                    <iframe allowFullScreen src={ReduxPreviewData?.videoData || PageData?.videoData} className=' fullscreen rounded w-full h-full' frameborder="0"></iframe>
                                    :
                                    <div className=' w-full h-full bg-slate-300 rounded'>
                                    </div>

                            }
                        </div>
                        <div className='w-full flex items-center justify-center px-5 py-4'>
                            <div className='flex px-4 w-full flex-col items-center gap-10'>
                                <span className='font-semibold text-2xl capitalize'>
                                    {ReduxPreviewData?.richHeading || PageData?.richHeading}
                                </span>
                                <span className='w-full break-words text-center whitespace-normal'>
                                    {ReduxPreviewData?.richBody || PageData?.richBody}
                                </span>
                            </div>
                        </div>


                        <hr />
                        <div className=' w-full flex flex-col gap-3 py-3'>
                            <div className=' w-full flex items-center justify-center'>
                                <div className=' flex flex-col items-center gap-1'>
                                    <span className=' font-semibold text-lg capitalize'>
                                        Reach us through Our Email :
                                    </span>
                                    <span onClick={() => handleRedirectEmail(ReduxPreviewData?.PageData || PageData?.emailData)} className=' font-semibold text-lg hover:opacity-80 cursor-pointer '><u>{ReduxPreviewData?.emailData || PageData?.emailData}</u></span>
                                </div>
                            </div>
                            <hr />
                            <div className=' w-full flex justify-between px-3 py-2'>
                                <div className=' flex flex-col gap-2'>
                                    {
                                        ReduxPreviewData?.linksData?.contactUs?.show != false || PageData?.linksData?.contactUs?.show != false
                                            ?
                                            <span onClick={() => handleCall(ReduxPreviewData?.linksData?.contactUs?.link || PageData?.linksData?.contactUs?.link)} >
                                                <span>
                                                    Contact Us
                                                </span>
                                                <span className=' pl-4'>
                                                    :
                                                </span>
                                                <span className=' pl-3'>
                                                    <span className=' cursor-pointer hover:text-blue-600'> <u> {ReduxPreviewData?.linksData?.contactUs?.link || PageData?.linksData?.contactUs?.link}</u></span>
                                                </span>
                                            </span>
                                            : ''
                                    }
                                    {
                                        ReduxPreviewData?.linksData?.websiteLink?.show != false || PageData?.linksData?.websiteLink?.show != false
                                            ?
                                            <span className=' flex cursor-pointer'>
                                                <span>
                                                    Visit Us
                                                </span>
                                                <span className=' pl-[50px]'>

                                                    :
                                                </span>
                                                <span className=' pl-[18.5px]'>

                                                    <a target='_blank' href={ReduxPreviewData?.linksData?.websiteLink?.link || PageData?.linksData?.websiteLink?.link}> <u> {ReduxPreviewData?.linksData?.websiteLink?.link || PageData?.linksData?.websiteLink?.link}</u></a>
                                                </span>
                                            </span>
                                            : ''
                                    }
                                </div>
                                <div className=' flex gap-3 items-center h-6'>
                                    {
                                        ReduxPreviewData?.linksData?.instagram?.show != false || PageData?.linksData?.instagram?.show
                                            ?
                                            <a href={ReduxPreviewData?.linksData?.instagram?.link || PageData?.linksData?.instagram?.link} target='_blank'>
                                                <img className=' w-[53px] h-[50px]' src={insta} alt="" />
                                            </a>
                                            : ''
                                    }
                                    {
                                        ReduxPreviewData?.linksData?.facebook?.show != false || PageData?.linksData?.facebook?.show
                                            ?
                                            <a href={ReduxPreviewData?.linksData?.facebook?.link || PageData?.linksData?.facebook?.link} target='_blank'>
                                                <img className=' w-fit h-[39px]' src={facebook} alt="" />
                                            </a>
                                            : ''
                                    }
                                    {
                                        ReduxPreviewData?.linksData?.youtube?.show || PageData?.linksData?.youtube?.show
                                            ?
                                            <a href={ReduxPreviewData?.linksData?.youtube?.link || PageData?.linksData?.youtube?.link} target='_blank'>
                                                <img className=' w-fit h-[35.5px]' src={ytLogo} alt="" />
                                            </a>
                                            : ''
                                    }
                                </div>
                            </div>

                        </div>
                    </>

            }

        </div>
    )
}

export default NpoPreview;