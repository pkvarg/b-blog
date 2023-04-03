import React, { useState, useEffect, useCallback } from 'react'
import { Navbar, SinglePostIntro } from '../components'
import { Posts, Contact } from './../sections'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebaseConfig'

import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'

const Home = () => {
  const navigate = useNavigate()
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

  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, 'posts')

  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
  }, [])
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef)
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        localStorage.setItem(
          'postList',
          JSON.stringify(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        )
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [deletePost])

  return (
    <>
      <Navbar />

      <div className='flex flex-col items-center justify-center h-[70vh]'>
        <h1 className='text-grey text-[45px]'>Welcome to</h1>
        <h1 className='text-grey text-[45px]'>the</h1>
        <h1 className='text-[45px] lg:text-[55px] text-white'>Bible Blog</h1>
      </div>

      <Posts />

      <h1 className='text-center text-white text-[50px] my-[125px]'>
        Newest Posts
      </h1>

      <div className='text-white flex flex-row items-center justify-center lg:m-20'>
        <div>Bible Facts</div>

        <div className='flex flex-col justify-center gap-5 m-4 lg:m-20'>
          {postList.map((post) => {
            return <SinglePostIntro key={post.id} post={post} />
          })}
        </div>
      </div>

      <Contact />
    </>
  )
}

export default Home
