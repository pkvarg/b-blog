import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from './Home'

const CreateBlog = () => {
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
    <>
      <p className='text-center m-4'>CreateBlog</p>
      <div className='flex flex-col gap-4 m-4 items-start'>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
      <div className='flex flex-col items-center gap-3'>
        Create a post
        <div className='inputGp '>
          <label>Title: </label>
          <input
            placeholder='Title...'
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
        </div>
        <div className='inputGp'>
          <label>Post: </label>
          <textarea
            placeholder='Post...'
            onChange={(e) => {
              setPostText(e.target.value)
            }}
          />
        </div>
        <button onClick={createPost}> Submit Post</button>
      </div>
    </>
  )
}

export default CreateBlog
