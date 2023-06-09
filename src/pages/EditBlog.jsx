import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth, xauth } from './../firebaseConfig'
import { storage } from './../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-hot-toast'

import { useParams } from 'react-router-dom'

const EditBlog = () => {
  const [postList, setPostList] = useState([])
  const params = useParams()

  const [isAuth, setIsAuth] = useState()
  const [title, setTitle] = useState('')
  const [postIntro, setPostIntro] = useState('')
  const [postText, setPostText] = useState('')
  const [image, setImage] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState('')
  const [imageName, setImageName] = useState('')
  const [editedPost, setEditedPost] = useState([])
  const imageUrl = image ? URL.createObjectURL(image) : null

  const navigate = useNavigate()

  useEffect(() => {
    const loggedIn = localStorage.getItem(xauth)
    if (loggedIn) {
      setIsAuth(loggedIn)
    } else if (!loggedIn) {
      setIsAuth(false)
    } else {
      setIsAuth(false)
    }
  }, [])

  useEffect(() => {
    const storagePosts = localStorage.getItem('postList')
      ? JSON.parse(localStorage.getItem('postList'))
      : []
    const currentPost = storagePosts.filter((post) => post.id === params.id)
    setEditedPost(currentPost)
    setTitle(currentPost[0].title)
    setPostIntro(currentPost[0].postIntro)
    setPostText(currentPost[0].postText)
    setImageFileUrl(currentPost[0].url)
    setImageName(currentPost[0].imageName)
  }, [])

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]
    if (imageFile) {
      setImage(imageFile)
      setImageName(imageFile.name)
    }
  }

  const editPost = (postId) => {
    const docRef = doc(db, 'posts', postId)
    const imageRef = ref(storage, imageName)

    if (image) {
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              updateDoc(docRef, {
                title,
                postIntro,
                postText,
                url,
                imageName,
                author: {
                  name: auth.currentUser.displayName,
                  id: auth.currentUser.uid,
                },
              })
            })
            .catch((error) => {
              toast.error(error.message, 'error getting image url')
            })
          //setImage(null)
          //alert('Post updated w Img')
          toast.success('Post with Image Updated')
          localStorage.removeItem('postList')
          navigate('/')
        })
        .catch((error) => {
          toast.error(error.message)
        })
    } else {
      try {
        updateDoc(docRef, {
          title,
          postIntro,
          postText,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
          },
        })
        //alert('Post updated no Img')
        toast.success('Post Updated')
        localStorage.removeItem('postList')
        navigate('/')
      } catch (error) {
        toast.error(error)
      }
    }
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
          {editedPost.map(
            (post) =>
              post.id === params.id && (
                <div key={post.id} className='flex flex-col gap-2'>
                  {/* <img src={imageFileUrl} className='w-[150px]' /> */}
                  <img
                    src={image ? imageUrl : imageFileUrl}
                    alt='the image file'
                    className='w-[150px]'
                  />

                  {/* <label>Image : </label> */}
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
