import React, { useState, useEffect, useCallback } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from './../firebaseConfig'
import { SinglePost, NavbarSubSite } from '../components'

const Blog = () => {
  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, 'posts')

  // const deletePost = useCallback(async (id) => {
  //   const postDoc = doc(db, 'posts', id)
  //   await deleteDoc(postDoc)
  // }, [])

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
  }, [])

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

  return (
    <>
      <NavbarSubSite />
      {postList.map((post) => {
        return <SinglePost key={post.id} post={post} isAuth={isAuth} />
      })}
    </>
  )
}

export default Blog
