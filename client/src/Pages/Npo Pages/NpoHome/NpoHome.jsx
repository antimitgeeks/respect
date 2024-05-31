import React, { useEffect, useState } from 'react'
import DialogComponent from '../../../components/DialogComponent';
import VideoModal from './VideoModal';

function NpoHome() {
    const [FinalData, setFinalData] = useState();
    const [logoUrl, setLogoUrl] = useState();
    const [bannerUrl, setBannerUrl] = useState();
    const [imageTextUrl, setImageTextUrl] = useState();
    const [imageText, setImageText] = useState('');
    const [videoModalData, setVideoModalData] = useState('')
    const [richHeading, setRichHeading] = useState('')
    const [richBody, setBody] = useState('')

    const [videoModalOpen, setVideoModalOpen] = useState(false)

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

        if (data?.includes('embed')) {
            setVideoModalData(data)
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

        setVideoModalOpen(false)
    }


    return (
        <div className='h-full   overflow-y-scroll w-full flex flex-col'>

            <div className=' w-full justify-end flex px-12 pt-3'>
                <span className=' border cursor-pointer bg-slate-400 rounded hover:opacity-80 text-white px-3 py-2'>

                    SAVE
                </span>
            </div>
            <div className='py-4 gap-1 flex justify-center '>
                <div className=' w-full mr-10 ml-1 my-1 h-fit gap-1 flex flex-col px-2 py-3 rounded border-2 border-slate-400'>
                    <div className=' relative'>
                        <span className=' absolute m-2 rounded-full  border'>
                            {
                                logoUrl ?

                                    <img className=' border-4 border-black w-[70px] h-[70px]  rounded-full' src={logoUrl} alt="" />
                                    :
                                    <div className=' cursor-pointer p-[1px]  focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-500 border-2  rounded-full'> <input onInput={(e) => handleLogoInput(e)} accept='image/*' id='logoInput' type="file" className=' hidden w-0' />
                                        <label htmlFor='logoInput' className=' m-0 cursor-pointer  w-[70px] h-[70px] rounded-full bg-slate-400  flex items-center justify-center'>LOGO</label>
                                    </div>

                            }
                        </span>
                        {
                            bannerUrl && bannerUrl.length > 0
                                ?
                                <img className=' w-full object-cover h-[350px]' src={bannerUrl} alt="" />
                                :
                                <div className=' flex  focus:border-2 p-1  focus:border-black focus:border-solid border-dashed border-slate-400 border-2 items-center justify-center bg-slate-300 w-full h-[400px]'>
                                    <div className=' p-[1px] py-[1px] focus:border-2 rounded focus:border-black focus:border-solid border-dashed border-slate-500 border-2'>
                                        <input onChange={(e) => handleBannerInput(e)} type="file" id='bannerInput' className=' w-0 hidden' accept='image/*' />
                                        <label htmlFor='bannerInput' className=' m-0 p-2 rounded cursor-pointer  bg-slate-400 '>Banner image</label>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className=' w-full justify-between flex '>
                        <div className=' h-[310px] border-r-4 self-stretch items-center justify-center flex w-full bg-slate-300'>
                            {
                                imageTextUrl && imageTextUrl?.length > 0
                                    ?
                                    <img className=' w-full h-full object-cover' src={imageTextUrl} alt="" />
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
                                {/* <span>HEAD</span> */}
                                <span className=' flex items-center  h-full py-2 justify-center w-full'>

                                    <textarea onInput={(e) => handleImageTextInput(e)} type="text" placeholder='Text' className=' py-2  min-h-[250px]  m-auto w-full h-full flex bg-transparent items-center justify-center  focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 border-2  px-1 outline-none' />
                                </span>
                                {/* <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis beatae libero iste, ad, dicta dolorum enim neque id quod qui itaque possimus.</span> */}
                            </div>
                        </div>
                    </div>
                    <div className=' w-full  focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 border-2 items-center justify-center   flex  bg-slate-300 h-[400px]'>

                        {
                            videoModalData?.length > 0 && videoModalData
                                ?
                                <iframe className=' w-full h-full' src={videoModalData} title="YouTube video player" referrerpolicy="strict-origin-when-cross-origin" frameborder="0" loop allow="accelerometer; loop; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
                            <span className=' w-[80%]'>

                                <input onInput={(e)=>setRichHeading(e.target.value.trim())} type="text" className=' py-1 focus:border-2 focus:border-black focus:border-solid border-dashed border-slate-400 w-full border-2 px-1 outline-none bg-inherit ' placeholder='Heading' />
                            </span>
                            {/* <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum est libero dicta fugiat voluptatem mollitia officia illum quae id debitis! Enim error ad aut quidem, atque aliquam ratione nesciunt est?</span> */}
                            {/* <textarea name="" id=""></textarea> */}
                            <textarea type="text" placeholder='Text' className=' py-1 focus:border-2 focus:border-black focus:border-solid border-slate-400 w-[80%] px-1 min-h-[200px] border-2 border-dashed flex items-center justify-center bg-inherit outline-none' />

                        </div>
                    </div>
                    {/* <div className=' w-full px-3 py-2 bg-slate-300'>
                        <div>Instagram</div>

                    </div> */}
                </div>
                {/* <div className=' w-1/3'>
            </div> */}
            </div>
        </div>
    )
}

export default NpoHome;