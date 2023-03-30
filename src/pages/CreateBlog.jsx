import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from './Home'

const CreateBlog = ({ isAuth }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')

  const postsCollectionRef = collection(db, 'posts')

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    })
    navigate('/')
  }

  return (
    isAuth && (
      <>
        <h1
          className='text-green text-[25px] ml-6 mt-2 cursor-pointer'
          onClick={() => navigate('/')}
        >
          Refresh Your Spirit of Faith.
        </h1>
        <div className='text-white mt-[12%]'>
          <h1 className='text-center text-[35px]'>Create a post</h1>

          <div className='flex flex-col items-center mt-4 gap-4'>
            <div className='flex justify-between'>
              <label>Title : </label>
              <textarea
                className='text-black'
                placeholder='Title...'
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>

            <div className='flex justify-between'>
              <label className=''>Post : </label>
              <textarea
                className='text-black'
                placeholder='Post...'
                onChange={(e) => {
                  setPostText(e.target.value)
                }}
              />
            </div>
            <button className='bg-green p-4 mt-2 w-[10%]' onClick={createPost}>
              {' '}
              Submit Post
            </button>
          </div>
        </div>
      </>
    )
  )
}

export default CreateBlog
