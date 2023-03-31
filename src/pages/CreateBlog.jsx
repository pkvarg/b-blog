import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from './../firebaseConfig'
import { storage } from './../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [postIntro, setPostIntro] = useState('')
  const [postText, setPostText] = useState('')
  const [isAuth, setIsAuth] = useState()
  const [image, setImage] = useState(null)
  const [urlLink, setUrlLink] = useState('')

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

  const createPost = () => {
    // await addDoc(postsCollectionRef, {
    //   title,
    //   postIntro,
    //   postText,

    //   author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    // })

    // image to firebase storage
    const imageRef = ref(storage, 'image')
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            addDoc(postsCollectionRef, {
              title,
              postIntro,
              postText,
              url,
              author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
              },
            })
            console.log(url)
          })
          .catch((error) => {
            console.log(error.message, 'error getting image url')
          })
        //setImage(null)
      })
      .catch((error) => {
        console.log(error.message)
      })

    console.log('url:', urlLink)

    navigate('/')
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
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
            <div>
              <label>Image : </label>
              <input type='file' onChange={handleImageChange} />
            </div>

            <div>
              <img src={urlLink} />
            </div>

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
