import React from 'react'
import { useNavigate } from 'react-router-dom'

const SinglePostIntro = ({ post }) => {
  const navigate = useNavigate()
  return (
    <div
      className='bg-singlePostBlack text-white rounded-xl cursor-pointer'
      onClick={() => navigate('/blog')}
    >
      <div className='p-8'>
        <h1 className='text-[45px] text-center'>{post.title}</h1>
        <p className='text-[25px] text-justify mt-2'>{post.postIntro}</p>
      </div>
    </div>
  )
}

export default SinglePostIntro
