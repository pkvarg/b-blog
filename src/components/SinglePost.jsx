import React, { useCallback } from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from './../firebaseConfig'

const SinglePost = ({ post, isAuth }) => {
  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
    window.location.reload()
  }, [])

  console.log('post:', post)

  return (
    <div
      className='bg-singlePostBlack text-white m-2 lg:m-10 rounded-xl'
      key={post.id}
    >
      <div className='p-8'>
        <img src={post.url} className='w-[5%]' />
        <h1 className='text-[45px] text-center'>{post.title}</h1>
        <p className='text-[25px] lg:text-justify mt-8'>{post.postText}</p>
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
