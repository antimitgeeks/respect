import React, { useState } from 'react';
import { toast } from 'react-toastify';

function VideoModal({ close, onchange }) {
    const [videoData, setVideoData] = useState('');
    const [videoFileData, setVideoFileData] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState();

    const handleSave = () => {
        // if (videoData || videoPreviewUrl || videoFileData) {
            close(videoPreviewUrl!=undefined?videoPreviewUrl: videoData);
        // } else {
            // toast.error("Field cannot be empty");
        // }
    };

    const handleVideoFile = (e) => {
        let video = e.target.files[0];
        if (video) {
            console.log('hi');
            setVideoFileData(video);
            setVideoPreviewUrl(URL.createObjectURL(video));
        }
    };

    return (
        <div className='flex flex-col gap-8 py-2 w-full'>
            <div className='relative flex w-full justify-between'>
                <div className='text-lg'>
                    VideoModal
                </div>
                <div className='absolute right-[-24px] flex items-center justify-center py-1 px-[11.5px] text-white bg-red-400 hover:opacity-75 bottom-6 cursor-pointer' onClick={() => close()}>
                    X
                </div>
            </div>
            <div className='w-full flex gap-5 items-center justify-between'>
                <input
                    placeholder='Enter video URL'
                    type="text"
                    className='w-full px-2 py-2 border outline-none'
                    onChange={(e) => setVideoData(e.target.value)}
                />
            </div>
            {/* <span className='m-auto self-center'>OR</span>
            <div className='items-center justify-between w-full flex'>
                <span>Select file from system:</span>
                <span className='self-end pl-6'>
                    <input
                        onChange={handleVideoFile}
                        type="file"
                        className='w-fit'
                        accept='video/*'
                    />
                </span>
            </div> */}
            <div className='w-full flex justify-end items-center'>
                <span onClick={handleSave} className='bg-slate-300 py-2 px-4 cursor-pointer'>Save</span>
            </div>
            
        </div>
    );
}

export default VideoModal;
