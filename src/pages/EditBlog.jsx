import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from './../firebaseConfig'
import { storage } from './../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { useParams } from 'react-router-dom'

const EditBlog = () => {
  const [postList, setPostList] = useState([])
  const params = useParams()

  const [isAuth, setIsAuth] = useState()
  const [title, setTitle] = useState('')
  const [postIntro, setPostIntro] = useState('')
  const [postText, setPostText] = useState('')
  const [image, setImage] = useState(null)
  const postsCollectionRef = collection(db, 'posts')

  const navigate = useNavigate()

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

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef)
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        localStorage.setItem('postList', JSON.stringify(postList))
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  useEffect(() => {
    const storedPosts = localStorage.getItem('postList')
      ? JSON.parse(localStorage.getItem('postList'))
      : []
    const filterStoredPosts = storedPosts.filter(
      (post) => post.id === params.id
    )
    console.log('init', filterStoredPosts)
    setTitle(filterStoredPosts[0].title)
    setPostIntro(filterStoredPosts[0].postIntro)
    setPostText(filterStoredPosts[0].postText)
  }, [])

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const editPost = (postId) => {
    const docRef = doc(db, 'posts', postId)
    const imageRef = ref(storage, image.name)
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            updateDoc(docRef, {
              title,
              postIntro,
              postText,
              url,
              author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
              },
            })
          })
          .catch((error) => {
            console.log(error.message, 'error getting image url')
          })
        //setImage(null)
      })
      .catch((error) => {
        console.log(error.message)
      })

    navigate('/')
  }

  return (
    isAuth && (
      <div className='text-white'>
        <h1
          className='text-green text-[25px] ml-6 mt-2 cursor-pointer'
          onClick={() => navigate('/')}
        >
          Home.
        </h1>

        <div className='flex flex-col mt-4 gap-4 text-[25px] mx-[30%]'>
          {postList.map(
            (post) =>
              post.id === params.id && (
                <div key={post.id} className='flex flex-col gap-2'>
                  <img src={post.url} className='w-[150px]' />
                  <label>Image : </label>
                  <input type='file' onChange={handleImageChange} />

                  <div className='flex justify-between'>
                    <label>Title : </label>
                    <textarea
                      className='text-black w-[85%]'
                      placeholder='Title...'
                      value={title}
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
                      defaultValue={postIntro}
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
                      defaultValue={postText}
                      onChange={(e) => {
                        setPostText(e.target.value)
                      }}
                    />
                  </div>
                  <button
                    className='bg-green p-4 mt-2 w-[85%] ml-auto'
                    onClick={() => editPost(post.id)}
                  >
                    {' '}
                    Edit Post
                  </button>
                </div>
              )
          )}
        </div>
      </div>
    )
  )
}

export default EditBlog
