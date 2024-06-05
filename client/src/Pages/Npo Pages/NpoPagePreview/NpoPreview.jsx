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

function NpoPreview() {

    const npoPageData = useSelector((state) => state.NpoDataSlice.data);
    console.log(npoPageData);
    const navigate = useNavigate();
    const [PageData, setPageData] = useState();
    const [loading, setLoading] = useState(false)

    const [decodedToken, setDecodedToken] = useState('');

    const { data: NpoPagedata, isFetching: ispageDataFetching, isLoading: ispageDataLoading } = useGetPageByIdQuery({ Id: decodedToken?.id })

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
            const DecodedData = jwtDecode(cookieData);
            setDecodedToken(DecodedData);
        }
    }, [cookieData]);

    useEffect(() => {

        console.log(PageData)
    }, [PageData])


    const handleRedirectEmail = (email) => {
        const emailServiceUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`; // Replace with your email service URL
        window.open(emailServiceUrl, '_blank');
    }

    const handleCall = (number) => {
        number.preventDefault()
        window.open(`tel:${number}`, '_blank');
    }


    /* functions for image get */
    const fetchLogoData = () => {
        const config = {
            method: "POST"
        };

        fetch(`https://3576-122-168-208-11.ngrok-free.app/api/v1/npos/image/${decodedToken?.id}?type=logo`, config)
            .then(response => {
                if (!response?.ok) {
                    throw new Error('Image not found');
                }
                console.log(response);
                return response?.blob();
            })
            .then(blob => {
                console.log(blob);
                const imgURL = blob? URL.createObjectURL(blob):'';
                console.log(imgURL);
                setLogoUrl(imgURL);
                console.log(blob, "res");
            })
            .catch(err => {
                console.log(err, "________________");
            });
    };
    useEffect(() => {

        fetchLogoData()
    }, [decodedToken]);

    ///////////////////////////////////////////////////////////////////////////////////////////
    const fetchBannerImgData = () => {
        const config = {
            method: "POST"
        };

        fetch(`https://3576-122-168-208-11.ngrok-free.app/api/v1/npos/image/${decodedToken?.id}?type=banner`, config)
            .then(response => {
                if (!response?.ok) {
                    throw new Error('Image not found');
                }
                return response?.blob();
            })
            .then(blob => {
                const imgURL = blob? URL.createObjectURL(blob):'';
                setBannerUrl(imgURL);
                console.log(blob, "res");
            })
            .catch(err => {
                console.log(err, "________________");
            });
    };

    useEffect(() => {
        fetchBannerImgData()
    }, [decodedToken])

    //////////////////////////////////////////////////////////////////////////////

    const fetchTextImgData = () => {
        const config = {
            method: "POST"
        };

        fetch(`https://3576-122-168-208-11.ngrok-free.app/api/v1/npos/image/${decodedToken?.id}?type=text`, config)
            .then(response => {
                if (!response?.ok) {
                    throw new Error('Image not found');
                }
                return response?.blob();
            })
            .then(blob => {
                const imgURL = blob? URL.createObjectURL(blob):'';
                setImageTextUrl(imgURL);
                console.log(blob, "res");
            })
            .catch(err => {
                console.log(err, "________________");
            });
    };
    useEffect(() => {
        fetchTextImgData()
    }, [decodedToken])



    return (
        <div className=' flex flex-col gap-2 pb-3 relative  w-full h-full'>
                <div onClick={()=>navigate('/dashboard')} className=' w-fit z-10  fixed right-4 hover:opacity-75 top-4 bg-[#f49a86] px-3 rounded cursor-pointer py-2'>
                    <span className=' cursor-pointer flex gap-2 items-center'> <MdKeyboardBackspace size={20}/>Back</span>
                </div>
            <div className=' relative w-full  '>
                <div className=' py-3 px-3 w-full absolute'>
                    {
                        logoUrl ?
                        <>
                    <img className=' w-[70px] h-[70px] rounded-full' src={logoUrl} alt="" />
                        </>
                        :
                        <div className=' bg-slate-400 h-[70px] w-[70px] rounded-full'>
                            
                        </div>
                    }
                </div>
                <div className=' w-full h-[580px]'>
                    {
                        bannerUrl ?
                        <>
                    <img className=' object-cover object-center h-full w-full' src={bannerUrl} alt="" />
                        </>
                        :
                        <div className=' bg-slate-300  w-full h-full'>

                        </div>
                    }
                </div>
            </div>
            <div className=' w-full gap-1 flex  px-3'>
                <div className=' w-1/2 min-h-[400px] h-full px-1 py-1'>
                    {
                        imageTextUrl ?
                        <img className=' rounded h-full w-full object-cover' src={imageTextUrl} alt="" />
                        :
                        <div className=' bg-slate-300 min-h-[400px] rounded h-full w-full'>
                            
                        </div>

                    }
                </div>
                <div className=' w-1/2 border my-1 px-3 rounded mr-1  flex items-center justify-center'>
                    <div className=' flex flex-col gap-3 items-center'>

                        <span className=' font-semibold text-xl mb-2'>{PageData?.imageHeading}</span>
                        <span>{PageData?.imageText}</span>
                    </div>
                </div>
            </div>
            <div className=' w-full h-[560px] px-20 py-3'>
                {
                    PageData?.videoData ?
                    <iframe allowFullScreen src={PageData?.videoData} className=' fullscreen rounded w-full h-full' frameborder="0"></iframe>
                    :
                    <div className=' w-full h-full bg-slate-300 rounded'>
                    </div>

                }
            </div>
            <div className=' w-full flex items-center justify-center px-5 py-4 '>
                <div className=' flex flex-col items-center gap-10'>
                    <span className=' font-semibold text-2xl capitalize'>
                        {PageData?.richHeading}
                    </span>
                    <span>
                        {PageData?.richBody}
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
                        <span onClick={() => handleRedirectEmail(PageData?.emailData)} className=' font-semibold text-lg hover:opacity-80 cursor-pointer '><u>{PageData?.emailData}</u></span>
                    </div>
                </div>
                <hr />
                <div className=' w-full flex justify-between px-3 py-2'>
                    <div className=' flex flex-col gap-2'>
                        {
                            PageData?.linksData?.contactUs?.show != false
                            &&
                            <span onClick={() => handleCall(PageData?.linksData?.contactUs?.link)} className=' cursor-pointer'>Contact Us :<a href={PageData?.linksData?.contactUs?.link}> <u> {PageData?.linksData?.contactUs?.link}</u></a></span>
                        }
                        {
                            PageData?.linksData?.websiteLink?.show != false
                            &&
                            <span className=' cursor-pointer'>Visit Us :<a href={PageData?.linksData?.websiteLink?.link}> <u> {PageData?.linksData?.websiteLink?.link}</u></a></span>
                        }
                    </div>
                    <div className=' flex gap-3 items-center h-6'>
                        {
                            PageData?.linksData?.instagram?.show != false
                            &&
                            <a href={PageData?.linksData?.instagram?.link || "https://www.instagram.com/"} target='_blank'>
                                <img className=' w-[53px] h-[50px]' src={insta} alt="" />
                            </a>
                        }
                        {
                            PageData?.linksData?.facebook?.show != false
                            &&
                            <a href={PageData?.linksData?.facebook?.link || "https://www.instagram.com/"} target='_blank'>
                                <img className=' w-fit h-[39px]' src={facebook} alt="" />
                            </a>
                        }
                        {
                            npoPageData?.linksData?.youtube?.show != false
                            &&
                            <a href={npoPageData?.linksData?.youtube?.link || "https://www.instagram.com/"} target='_blank'>
                                <img className=' w-fit h-[35.5px]' src={ytLogo} alt="" />
                            </a>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NpoPreview;