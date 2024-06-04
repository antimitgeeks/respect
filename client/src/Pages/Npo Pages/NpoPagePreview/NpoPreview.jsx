import React from 'react'
import { useSelector } from 'react-redux';
import insta from '../../../Assets/insta.png'
import facebook from '../../../Assets/Facebook_Logo_2023.png'
import ytLogo from '../../../Assets/Youtube_logo.png'

function NpoPreview() {

    const npoPageData = useSelector((state) => state.NpoDataSlice.data);
    console.log(npoPageData)
    return (
        <div className=' flex flex-col gap-2 pb-5   w-full h-full'>
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
                    <span className=' border-b-2 font-semibold text-2xl'>
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
                        <span className=' font-semibold text-lg '>{npoPageData?.emailData}</span>
                    </div>
                </div>
                <hr />
                <div className=' w-full flex justify-between px-3 py-2'>
                    <div className=' flex gap-2'>
                        <span className=' cursor-pointer'><a href={npoPageData?.linksData?.contactUs?.link}> <u>Contact Us</u></a></span>
                        <span className=' cursor-pointer'><a href={npoPageData?.linksData?.websiteLink?.link}> <u>Visit Us</u></a></span>
                    </div>
                    <div className=' flex gap-3 items-center h-6'>
                        {
                            npoPageData?.linksData?.instagram?.show!=false
                            &&
                            <a href={npoPageData?.linksData?.instagram?.link || "https://www.instagram.com/"} target='_blank'>
                                <img className=' w-[50px] h-[48px]' src={insta} alt="" />
                            </a>
                        }
                        {
                            npoPageData?.linksData?.facebook?.show!=false
                            &&
                            <a href={npoPageData?.linksData?.facebook?.link || "https://www.instagram.com/"} target='_blank'>
                                <img className=' w-fit h-[39px]' src={facebook} alt="" />
                            </a>
                        }
                         {
                            npoPageData?.linksData?.youtube?.show!=false
                            &&
                            <a href={npoPageData?.linksData?.youtube?.link || "https://www.instagram.com/"} target='_blank'>
                                <img className=' w-fit h-[36px]' src={ytLogo} alt="" />
                            </a>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NpoPreview;