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

        fetch(`http://192.168.1.64:8080/api/v1/npos/image/${Id || decodedToken?.id}?type=logo`, config)
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

        fetch(`http://192.168.1.64:8080/api/v1/npos/image/${Id || decodedToken?.id}?type=banner`, config)
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
        fetch(`http://192.168.1.64:8080/api/v1/npos/image/${Id ? Id : decodedToken?.id}?type=text`, config)
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

    console.log(PageData)

    return (
        <div className=' flex flex-col gap-2 pb-3 relative  w-full h-full'>
            {
                Id && !PageData || PageData?.length==0 ?
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
                                    ReduxPreviewData?.logoUrl == undefined || ReduxPreviewData?.logoUrl == '' ||  logoUrl|| PageData?.logoUrl == undefined
                                        ?
                                        // logoUrl!='' || ReduxPreviewData?.logoUrl!='' ?
                                          logoUrl ?
                                            // ReduxPreviewData?.logoUrl?.length == 0 ?
                                            //     <div className=' bg-slate-400 h-[70px] w-[70px] rounded-full'>

                                            //     </div>
                                                // :
                                                <img className=' sm:w-[70px] w-[45px] h-[45px] sm:h-[70px] rounded-full' src={ReduxPreviewData?.logoUrl || logoUrl} alt="" />
                                            :
                                            <>
                                                <div className=' bg-slate-400 h-[70px] w-[70px] rounded-full'>

                                                </div>
                                            </>
                                        :
                                        <img className=' w-[70px] h-[70px] rounded-full' src={ReduxPreviewData?.logoUrl || logoUrl} alt="" />
                                }
                            </div>
                            <div className=' w-full h-[380px] sm:h-[580px]'>
                                {
                                    ReduxPreviewData?.bannerUrl == undefined || ReduxPreviewData?.bannerUrl == '' || PageData?.bannerUrl == undefined
                                        ?
                                        bannerUrl ?
                                       
                                             
                                                <div className=' w-full h-full'>
                                                    <img className=' object-cover object-center h-full w-full' src={ReduxPreviewData?.bannerUrl || bannerUrl} alt="" />
                                                    <span className=' absolute top-[175px] sm:top-[250px] text-white w-full flex items-center justify-center'>
                                                        <span style={{ color: ReduxPreviewData?.bannerTextColor != undefined ? ReduxPreviewData?.bannerTextColor : PageData?.bannerTextColor }} className=' w-full px-16 break-words text-center text-slate-50 text-[30px] rounded py-1'>
                                                            {ReduxPreviewData?.bannerBackgroundText != undefined ? ReduxPreviewData?.bannerBackgroundText : PageData?.bannerBackgroundText}
                                                        </span>
                                                    </span>
                                                </div> :
                                            <div className=' bg-slate-300  w-full h-full'>

                                            </div>
                                        :
                                        <div className=' w-full h-full'>
                                            <img className=' object-cover object-center h-full w-full' src={ReduxPreviewData?.bannerUrl || bannerUrl} alt="" />
                                            <span className=' absolute top-[250px] text-white w-full flex items-center justify-center'>
                                                <span style={{ color: ReduxPreviewData?.bannerTextColor != undefined ? ReduxPreviewData?.bannerTextColor : PageData?.bannerTextColor }} className=' w-full px-16 break-words text-center text-slate-50 text-[30px] rounded py-1'>
                                                    {ReduxPreviewData?.bannerBackgroundText != undefined ? ReduxPreviewData?.bannerBackgroundText : PageData?.bannerBackgroundText}
                                                </span>
                                            </span>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className='w-full gap-1 flex items-center justify-center center flex-col sm:flex-row px-2 sm:px-3'>
                            <div className=' w-full self-center sm:w-1/2  flex items-center justify-center min-h-[220px] sm:min-h-[320px] h-full px-1 py-1'>
                                {
                                    ReduxPreviewData?.imageTextUrl == undefined || ReduxPreviewData?.imageTextUrl == '' || PageData?.imageTextUrl == undefined
                                        ?
                                       imageTextUrl ?

                                                <img className='rounded self-center   object-cover' src={ReduxPreviewData?.imageTextUrl || imageTextUrl} alt="" />

                                            :
                                            <div className='bg-slate-300 min-h-[400px] rounded h-full w-full'>
                                            </div>
                                        :
                                        <img className='rounded object-cover self-center' src={ReduxPreviewData?.imageTextUrl || imageTextUrl} alt="" />
                                }
                            </div>
                            <div className=' w-full sm:w-1/2  self-stretch  border my-1 px-3 rounded mr-1 flex items-center justify-center'>
                                <div className='w-full flex flex-col gap-3 items-center'>
                                    <span className='font-semibold text-xl mb-2'>{ReduxPreviewData?.imageHeading != undefined ? ReduxPreviewData?.imageHeading : PageData?.imageHeading}</span>
                                    <span className='w-full text-center  h-auto overflow-hidden whitespace-pre-wrap break-words'>
                                        {ReduxPreviewData?.imageText != undefined ? ReduxPreviewData?.imageText : PageData?.imageText}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className=' w-full h-[380px] sm:h-[625px] px-2 sm:px-20 py-3'>
                            {
                                ReduxPreviewData?.videoData == undefined || ReduxPreviewData?.videoData == '' || PageData?.videoData == undefined ?
                                    PageData?.videoData ?
                                        ReduxPreviewData?.videoData?.length < 1 ?
                                            <div className=' w-full h-full bg-slate-300 rounded'>
                                            </div>
                                            :
                                            <iframe allowFullScreen src={ReduxPreviewData?.videoData != undefined ? ReduxPreviewData?.videoData : PageData?.videoData} className=' fullscreen rounded w-full h-full' ></iframe>

                                        :
                                        ReduxPreviewData?.videoData?.length>1?
                                        <iframe allowFullScreen src={ReduxPreviewData?.videoData != undefined ? ReduxPreviewData?.videoData : PageData?.videoData} className=' fullscreen rounded w-full h-full' ></iframe>
                                        :
                                        <div className=' w-full h-full bg-slate-300 rounded'>
                                        </div>
                                    :
                                    <iframe allowFullScreen src={ReduxPreviewData?.videoData != undefined ? ReduxPreviewData?.videoData : PageData?.videoData} className=' fullscreen rounded w-full h-full' ></iframe>

                            }
                        </div>
                        <div className='w-full flex items-center justify-center px-2 sm:px-5 py-4'>
                            <div className='flex px-4 w-full flex-col items-center gap-10'>
                                <span className='font-semibold text-md sm:text-2xl capitalize'>
                                    {ReduxPreviewData?.richHeading != undefined ? ReduxPreviewData?.richHeading : PageData?.richHeading}
                                </span>
                                <span className='w-full sm:text-md text-sm break-words text-center whitespace-normal'>
                                    {ReduxPreviewData?.richBody != undefined ? ReduxPreviewData?.richBody : PageData?.richBody}
                                </span>
                            </div>
                        </div>
                        <hr />

                        <div className=' flex-wrap flex w-full items-center gap-4 mb-4 mt-2 py-3 justify-center'>

                            {
                                ReduxPreviewData?.linksData?.websiteLink?.show != false || PageData?.linksData?.websiteLink?.show != false
                                    ?
                                    <span className=' flex cursor-pointer'>

                                        <span className=' text-[14.9px] font-bold pl-[18.5px]'>

                                            <a target='_blank' href={ReduxPreviewData?.linksData?.websiteLink?.link || PageData?.linksData?.websiteLink?.link}> <u>Website Link</u></a>
                                        </span>
                                    </span>
                                    : ''
                            }
                            <div className=' pl-1 flex gap-3 items-center'>

                                {
                                    ReduxPreviewData?.linksData?.facebook?.show != false || PageData?.linksData?.facebook?.show
                                        ?
                                        <a href={ReduxPreviewData?.linksData?.facebook?.link || PageData?.linksData?.facebook?.link} target='_blank'>
                                            <img className=' w-fit h-[22px] sm:h-[22px] hover:opacity-80' src={facebook} alt="" />
                                        </a>
                                        : ''
                                }
                                {
                                    ReduxPreviewData?.linksData?.instagram?.show != false || PageData?.linksData?.instagram?.show
                                        ?
                                        <a href={ReduxPreviewData?.linksData?.instagram?.link || PageData?.linksData?.instagram?.link} target='_blank'>
                                            <img className=' w-[18px] h-[18px] sm:w-[27px] hover:opacity-80 sm:h-[27px]' src={insta} alt="" />
                                        </a>
                                        : ''
                                }
                                {
                                    ReduxPreviewData?.linksData?.youtube?.show || PageData?.linksData?.youtube?.show
                                        ?
                                        <a href={ReduxPreviewData?.linksData?.youtube?.link || PageData?.linksData?.youtube?.link} target='_blank'>
                                            <img className=' w-fit h-[17.5px] sm:h-[20.0px] hover:opacity-80' src={ytLogo} alt="" />
                                        </a>
                                        : ''
                                }
                            </div>
                            {
                                ReduxPreviewData?.linksData?.contactUs?.show != false || PageData?.linksData?.contactUs?.show != false
                                    ?
                                    <span onClick={() => handleCall(ReduxPreviewData?.linksData?.contactUs?.link || PageData?.linksData?.contactUs?.link)} >
                                        <span className=' pl-3'>
                                            <span className=' text-[14.9px] cursor-pointer font-bold hover:text-blue-600'> <u> Contact Us</u></span>
                                        </span>
                                    </span>
                                    : ''
                            }
                            <div className=' flex text-[14.9px] flex-col items-center gap-1'>
                                <span onClick={() => handleRedirectEmail(ReduxPreviewData?.PageData || PageData?.emailData)} className=' font-bold text-md hover:text-blue-500 cursor-pointer '><u>Email Address</u></span>
                            </div>

                        </div>


                        {/* <div className=' w-full flex flex-col gap-3 py-3'>
                            <div className=' w-full flex items-center justify-center'>
                                <div className=' flex flex-col items-center gap-1'>
                                    <span className=' font-semibold text-lg capitalize'>
                                        Reach us through Our Email :
                                    </span>
                                    <span onClick={() => handleRedirectEmail(ReduxPreviewData?.PageData || PageData?.emailData)} className=' font-semibold text-lg hover:opacity-80 cursor-pointer '><u>{ReduxPreviewData?.emailData || PageData?.emailData}</u></span>
                                </div>
                            </div>
                            <hr />
                            <div className=' w-full flex flex-col sm:flex-row sm:gap-1 gap-5 justify-between px-3 py-2'>
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
                                                <img className=' w-[38px] h-[38px] sm:w-[53px] sm:h-[50px]' src={insta} alt="" />
                                            </a>
                                            : ''
                                    }
                                    {
                                        ReduxPreviewData?.linksData?.facebook?.show != false || PageData?.linksData?.facebook?.show
                                            ?
                                            <a href={ReduxPreviewData?.linksData?.facebook?.link || PageData?.linksData?.facebook?.link} target='_blank'>
                                                <img className=' w-fit h-[28px] sm:h-[39px]' src={facebook} alt="" />
                                            </a>
                                            : ''
                                    }
                                    {
                                        ReduxPreviewData?.linksData?.youtube?.show || PageData?.linksData?.youtube?.show
                                            ?
                                            <a href={ReduxPreviewData?.linksData?.youtube?.link || PageData?.linksData?.youtube?.link} target='_blank'>
                                                <img className=' w-fit h-[28px] sm:h-[35.5px]' src={ytLogo} alt="" />
                                            </a>
                                            : ''
                                    }
                                </div>
                            </div>

                        </div> */}
                    </>

            }

        </div>
    )
}

export default NpoPreview;