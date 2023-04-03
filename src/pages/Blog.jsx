import React, { useState, useEffect } from 'react'
import { collection } from 'firebase/firestore'
import { db, xauth } from './../firebaseConfig'
import { SinglePost, NavbarSubSite } from '../components'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const [postList, setPostList] = useState([])
  const [storedPosts, setStoredPosts] = useState([])
  const [isAuth, setIsAuth] = useState()
  const [currentPost, setCurrentPost] = useState([])
  const postsCollectionRef = collection(db, 'posts')
  const params = useParams()
  const id = params.id

  useEffect(() => {
    const loggedIn = localStorage.getItem(xauth)
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
    const postById = storagePosts.find((post) => post.id === id)
    setCurrentPost(postById)
  }, [id])

  return (
    <>
      <NavbarSubSite />
      {!id ? (
        storedPosts.map((post) => {
          return <SinglePost key={post.id} post={post} isAuth={isAuth} />
        })
      ) : (
        <SinglePost post={currentPost} isAuth={isAuth} />
      )}
    </>
  )
}

export default Blog
