import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from './../firebaseConfig'
import { toast } from 'react-hot-toast'
import LikeButton from './../components/LikeButton'

const SinglePost = ({ post, isAuth }) => {
  const navigate = useNavigate()
  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
    localStorage.removeItem('postList')
    toast.success('Post deleted')
    navigate('/')
  }, [])

  const editPost = (postId) => {
    navigate(`/edit-blog/${postId}`)
  }

  return (
    <div
      className='bg-singlePostBlack text-white m-2 lg:m-10 rounded-xl relative'
      key={post.id}
    >
      <div className='px-8 py-14'>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-8'>
          <img src={post.url} className='w-[75px] h-[75px]' />
          <h1 className='text-[45px] text-center'>{post.title}</h1>
        </div>

        <p className='text-[25px] text-justify mt-8'>{post.postIntro}</p>

        <p className='text-[25px] text-justify mt-8 mb-8'>{post.postText}</p>
        <LikeButton id={post.id} />
      </div>

      <div>
        {isAuth && (
          <>
            <button
              className='absolute top-3 right-3'
              onClick={() => editPost(post.id)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                className='bi bi-pencil-square'
                viewBox='0 0 16 16'
              >
                <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                <path
                  fillRule='evenodd'
                  d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                />
              </svg>
            </button>
            <button
              className='absolute top-14 right-3'
              onClick={() => deletePost(post.id)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='currentColor'
                className='bi bi-trash3'
                viewBox='0 0 16 16'
              >
                <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z' />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default SinglePost
