import React, { useState, useEffect } from 'react'
import { collection } from 'firebase/firestore'
import { db } from './../firebaseConfig'
import { SinglePost, NavbarSubSite } from '../components'

const Blog = () => {
  const [postList, setPostList] = useState([])
  const [storedPosts, setStoredPosts] = useState([])
  const postsCollectionRef = collection(db, 'posts')
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
    const storagePosts = localStorage.getItem('postList')
      ? JSON.parse(localStorage.getItem('postList'))
      : []
    setStoredPosts(storagePosts)
  }, [])

  return (
    <>
      <NavbarSubSite />
      {storedPosts.map((post) => {
        return <SinglePost key={post.id} post={post} isAuth={isAuth} />
      })}
    </>
  )
}

export default Blog
