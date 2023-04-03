import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SinglePostIntro = ({ post }) => {
  const navigate = useNavigate()
  const params = useParams()

  return (
    <div className='bg-singlePostBlack text-white rounded-xl'>
      <div className='p-8'>
        <h1 className='text-[45px] text-center'>{post.title}</h1>
        <p className='text-[25px] text-justify mt-2'>{post.postIntro}</p>
        <p
          onClick={() => navigate(`/blog/${post.id}`)}
          className='float-right text-green cursor-pointer'
        >
          Read more
        </p>
      </div>
    </div>
  )
}

export default SinglePostIntro
