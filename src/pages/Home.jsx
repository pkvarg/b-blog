import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
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

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      //navigate('/')
    })
  }

  const [postList, setPostsList] = useState([])
  const postsCollectionRef = collection(db, 'posts')
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef)
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  })

  return (
    <>
      <h1 className='text-center mt-5'>Bible Blog</h1>
      <div className='flex flex-col gap-2 p-4'>
        {!isAuth ? (
          <Link to={'/login'}>Login</Link>
        ) : (
          <>
            <button onClick={signUserOut}>Log out</button>
            <Link to={'/create-blog'}>Create new Blog</Link>
          </>
        )}
      </div>
      <h1 className='text-center'>POSTS</h1>
      <div>
        {postList.map((post) => {
          return (
            <div>
              <div>
                <h1>{post.title}</h1>
              </div>
              <div>{post.postText}</div>
              <div>
                <h2>{post.author.name}</h2>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
