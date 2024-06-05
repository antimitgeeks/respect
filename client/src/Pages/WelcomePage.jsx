import React from 'react'

function WelcomePage() {
  return (
    <div className=' w-full h-[95vh] flex items-center justify-center'>
        <div className=' hover:animate-pulse cursor-default w-fit'>
            <span className=' border py-3 px-3 shadow  text-xl rounded '>Welcome to Respect Panel</span>
        </div>
    </div>
  )
}

export default WelcomePage;