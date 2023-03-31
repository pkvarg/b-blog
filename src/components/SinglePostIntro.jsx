import React from 'react'

const SinglePostIntro = ({ post}) => {
  return (
    <div className='bg-singlePostBlack text-white w-[33%] m-10 rounded-xl'>
      <div className='p-8'>
        <h1 className='text-[45px] text-center'>{post.title}</h1>
        <p className='text-[25px] text-justify mt-2'>{post.postIntro}</p>
      </div>
    </div>
  )
}

export default SinglePostIntro
