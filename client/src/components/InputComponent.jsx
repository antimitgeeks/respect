import React from 'react';
import { ErrorMessage } from 'formik';

function InputComponent(
    {
        value,
        onChange,
        placeholder,
        name,
        type,
        label,
        required,
        defaultValue,
        auto
    }
) {
    return (
  
            <div className=' w-full relative'>
                {
                    label && <span className=' font-semibold text-[13px]'>{label} {required && <span className='text-red-400'>*</span> } </span>
                }
                <input
                    value={value}
                    autoComplete={auto}
                    defaultValue={defaultValue}
                    name={name}
                    onChange={onChange}
                    className='px-2 py-2 rounded w-full border outline-none'
                    type={type}
                    placeholder={placeholder}
                />
                {
                    name && 
                <ErrorMessage className='text-red-400 absolute text-[14px]  mt-0' name={name} component='div' />
                }
            </div>
       
    )
}
export default InputComponent;