import React from 'react'

const Posts = () => {
  return (
    <>
      <div className='mx-2 lg:mx-20 flex flex-col lg:flex-row justify-center items-center gap-4 border border-white rounded-xl text-white text-center'>
        <img src='/tree.png' alt='pasture' className='h-[75px] mt-4 lg:mt-0' />
        <div className='p-[20px]'>
          <p className=' text-[30px]'>
            "For the word of God is alive and active...
          </p>
          <p className='text-[30px]'>
            it penetrates even to dividing soul and spirit..."
          </p>
          <span>Heb 4:12</span>
        </div>
      </div>
    </>
  )
}

export default Posts
