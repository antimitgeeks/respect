import React from 'react'
import { useSelector } from 'react-redux';
import insta from '../../../Assets/insta.png'
import facebook from '../../../Assets/Facebook_Logo_2023.png'
import ytLogo from '../../../Assets/Youtube_logo.png'

function NpoPreview() {

    const npoPageData = useSelector((state) => state.NpoDataSlice.data);
    console.log(npoPageData);


    const handleRedirectEmail = (email) => {
        const emailServiceUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`; // Replace with your email service URL
        window.open(emailServiceUrl, '_blank');
    }

    const handleCall = (number) => {
        number.preventDefault()
        window.open(`tel:${number}`, '_blank');
    }


    return (
        <div className=' flex flex-col gap-2 pb-3   w-full h-full'>
            <div className=' relative w-full  '>
                <div className=' py-3 px-3 w-full absolute'>
                    <img className=' w-[70px] h-[70px] rounded-full' src={npoPageData?.logoUrl} alt="" />
                </div>
                <div className=' w-full h-[580px]'>
                    <img className=' object-cover object-center h-full w-full' src={npoPageData?.bannerUrl} alt="" />
                </div>
            </div>
            <hr className=' text-black bg-slate-400 ' />
            <div className=' w-full gap-1 flex  px-3'>
                <div className=' w-1/2 min-h-[400px] h-full px-1 py-1'>
                    <img className=' rounded h-full w-full object-cover' src={npoPageData?.imageTextUrl} alt="" />
                </div>
                <div className=' w-1/2 border my-1 px-3 rounded mr-1  flex items-center justify-center'>
                    <div className=' flex flex-col gap-3 items-center'>
                        <span className=' font-semibold text-xl mb-2'>{npoPageData?.imageHeading}</span>
                        <span>{npoPageData?.imageText}</span>
                    </div>
                </div>
            </div>
            <hr className=' text-black bg-slate-400' />
            <div className=' w-full h-[560px] px-20 py-3'>
                <iframe allowFullScreen src={npoPageData?.videoData} className=' fullscreen rounded w-full h-full' frameborder="0"></iframe>
            </div>
            <hr className=' bg-slate-400' />
            <div className=' w-full flex items-center justify-center px-5 py-4 '>
                <div className=' flex flex-col items-center gap-10'>
                    <span className=' font-semibold text-2xl capitalize'>
                        {npoPageData?.richHeading}
                    </span>
                    <span>
                        {npoPageData?.richBody}
                    </span>
                </div>
            </div>
            <hr className=' bg-slate-400' />
            <div className=' w-full flex flex-col gap-3 py-3'>
                <div className=' w-full flex items-center justify-center'>
                    <div className=' flex flex-col items-center gap-1'>
                        <span className=' font-semibold text-lg capitalize'>
                            Reach us through Our Email :
                        </span>
                        <span onClick={() => handleRedirectEmail(npoPageData?.emailData)} className=' font-semibold text-lg hover:opacity-80 cursor-pointer '><u>{npoPageData?.emailData}</u></span>
                    </div>
                </div>
                <hr />
                <div className=' w-full flex justify-between px-3 py-2'>
                    <div className=' flex flex-col gap-2'>
                        {
                            npoPageData?.linksData?.contactUs?.show != false
                            &&
                            <span onClick={() => handleCall(npoPageData?.linksData?.contactUs?.link)} className=' cursor-pointer'><a href={npoPageData?.linksData?.contactUs?.link}> <u>Contact Us : {npoPageData?.linksData?.contactUs?.link}</u></a></span>
                        }
                        {
                            npoPageData?.linksData?.websiteLink?.show != false
                            &&
                            <span className=' cursor-pointer'><a href={npoPageData?.linksData?.websiteLink?.link}> <u>Visit Us : {npoPageData?.linksData?.websiteLink?.link}</u></a></span>
                        }
                    </div>
                    <div className=' flex gap-3 items-center h-6'>
                        {
                            npoPageData?.linksData?.instagram?.show != false
                            &&
                            <a href={npoPageData?.linksData?.instagram?.link || "https://www.instagram.com/"} target='_blank'>
                                <img className=' w-[53px] h-[50px]' src={insta} alt="" />
                            </a>
                        }
                        {
                            npoPageData?.linksData?.facebook?.show != false
                            &&
                            <a href={npoPageData?.linksData?.facebook?.link || "https://www.instagram.com/"} target='_blank'>
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