import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from './Home'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [postIntro, setPostIntro] = useState('')
  const [postText, setPostText] = useState('')

  const [isAuth, setIsAuth] = useState()

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuth')
    if (loggedIn) {
      setIsAuth(loggedIn)
    } else if (!loggedIn) {
      setIsAuth(false)
    } else {
      setIsAuth(false)
    }
  }, [])

  console.log('create is auth:', isAuth)

  const postsCollectionRef = collection(db, 'posts')

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postIntro,
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
        <div className='text-white mt-[2%]'>
          <h1 className='text-center text-[35px]'>Create a post</h1>

          <div className='flex flex-col mt-4 gap-4 text-[25px] mx-[30%]'>
            <div className='flex justify-between'>
              <label>Title : </label>
              <textarea
                className='text-black w-[85%]'
                placeholder='Title...'
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>

            <div className='flex justify-between'>
              <label>Intro : </label>
              <textarea
                className='text-black h-[150px] w-[85%]'
                placeholder='Intro...'
                onChange={(e) => {
                  setPostIntro(e.target.value)
                }}
              />
            </div>

            <div className='flex justify-between h-[250px]'>
              <label className=''>Post : </label>
              <textarea
                className='text-black w-[85%]'
                placeholder='Post...'
                onChange={(e) => {
                  setPostText(e.target.value)
                }}
              />
            </div>
            <button
              className='bg-green p-4 mt-2 w-[85%] ml-auto'
              onClick={createPost}
            >
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
