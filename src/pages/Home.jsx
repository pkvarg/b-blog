import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Footer } from '../components'
import { Posts } from './../sections'
// Import the functions you need from the SDKs you need
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

const Home = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate()

  // const signUserOut = () => {
  //   signOut(auth).then(() => {
  //     localStorage.clear()
  //     setIsAuth(false)
  //     //navigate('/')
  //   })
  // }

  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, 'posts')

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, 'posts', id)
  //   await deleteDoc(postDoc)
  //   window.location.reload()
  // }

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef)
  //     console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   }
  //   getPosts()
  // }, [])

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
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

      <div className='flex flex-col items-center justify-center h-[80vh]'>
        <h1 className='text-grey text-[45px]'>Welcome to</h1>
        <h1 className='text-grey text-[45px]'>the</h1>
        <h1 className='text-[45px] lg:text-[55px] text-white'>Bible Blog</h1>
      </div>
      <div className='flex flex-col gap-2 p-4 text-white'>
        {/* {!isAuth ? (
          <Link to={'/login'}>Login</Link>
        ) : (
          <>
            <button onClick={signUserOut}>Log out</button>
            <Link to={'/create-blog'}>Create new Blog</Link>
          </>
        )} */}
      </div>
      {/* <h1 className='text-center text-white'>POSTS</h1> */}
      {/* <div>
        {postList.map((post) => {
          return (
            <div className='text-white'>
              <div>
                <h1>{post.title}</h1>
              </div>
              <div>
                <button onClick={() => deletePost(post.id)}>&#128465;</button>
              </div>
              <div>{post.postText}</div>
              <div>
                <h2>{post.author.name}</h2>
              </div>
            </div>
          )
        })}
      </div> */}
      <Posts />
      <Footer />
    </>
  )
}

export default Home
