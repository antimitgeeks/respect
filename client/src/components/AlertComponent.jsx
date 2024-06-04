import React from 'react'
import { confirmAlert } from 'react-confirm-alert';

function AlertComponent(
    {
        handleDeleteYes,
        heading
    }
) {

    return confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className='  bg-white  shadow rounded  py-2 px-1 w-full'>
                    <div className=' pt-3 pb-1 px-3  flex items-center justify-center gap-7 flex-col'>

                        <h1 className=' text-[20px] font-semibold'>{heading} </h1>
                        <div className=' w-full flex justify-evenly'>
                            <button
                                onClick={() => {
                                    handleDeleteYes();
                                    onClose();
                                }}
                                className=' py-[3px] px-3 bg-slate-600 rounded hover:opacity-75 text-[14px] text-white'
                            >
                                Yes 
                            </button>
                            
                            <button onClick={onClose}  className=' py-[3px] px-3 bg-slate-600 text-[14px] rounded text-white hover:opacity-75'>No</button>
                        </div>
                    </div>
                </div>
            );
        }
    });
}

export default AlertComponent