import React from 'react'

const SinglePost = ({ post, isAuth }) => {
  return (
    <div className='bg-singlePostBlack text-white m-10 rounded-xl'>
      <div className='p-8'>
        <h1 className='text-[45px] text-center'>{post.title}</h1>
        <p className='text-[25px] text-justify mt-8'>{post.postText}</p>
      </div>
      <div>
        {isAuth && (
          <button className='float-right' onClick={() => deletePost(post.id)}>
            &#128465;
          </button>
        )}
      </div>
    </div>
  )
}

export default SinglePost
