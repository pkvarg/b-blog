import React, { useEffect, useState } from 'react'
import { doc, getDocs, updateDoc, collection } from 'firebase/firestore'

import { db } from './../firebaseConfig'

const LikeButton = ({ id }) => {
  const [likeCount, setLikeCount] = useState()

  useEffect(() => {
    const col = collection(db, 'posts')
    const getLikes = async (id) => {
      const data = await getDocs(col)
      const filteredData = data.docs.filter((post) => post.id === id)
      const likesInDB =
        filteredData[0]._document.data.value.mapValue.fields.likes.integerValue
      setLikeCount(likesInDB)
    }
    getLikes(id)
  }, [setLikeCount])

  const handleLike = async () => {
    const likesRef = doc(db, 'posts', id)
    const col = collection(db, 'posts')

    const data = await getDocs(col)
    const filteredData = data.docs.filter((post) => post.id === id)
    const likesInDB =
      filteredData[0]._document.data.value.mapValue.fields.likes.integerValue

    const increasedLikes = Number(likesInDB) + Number(1)
    setLikeCount(increasedLikes)
    updateDoc(likesRef, {
      likes: increasedLikes,
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className='text-[#ffffff] gap-4  float-right flex'>
      <button
        className='bg-green px-[10px] hover:bg-white hover:text-green'
        onClick={handleLike}
      >
        Like{' '}
      </button>
      <p>👍 {likeCount} </p>
    </div>
  )
}

export default LikeButton
