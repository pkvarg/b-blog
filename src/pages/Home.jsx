import React, { useState, useEffect, useCallback } from 'react'
import { Navbar, SinglePostIntro } from '../components'
import { Posts, Contact } from './../sections'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  getFirestore,
  getDocs,
  collection,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

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

  console.log('home is auth:', isAuth)

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
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [deletePost])

  console.log(postList)

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

      <div className='flex flex-col lg:flex-row justify-center gap-5 m-4 lg:m-20'>
        {postList.map((post) => {
          return (
            <SinglePostIntro
              key={post.id}
              post={post}
              onClick={() => navigate('/blog')}
            />
          )
        })}
      </div>

      <Contact />
    </>
  )
}

export default Home
