import React, { useState } from 'react'
import { auth, provider, xauth, db } from './../firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const Login = () => {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState()
  const [agreed, setAgreed] = useState(0)
  const [declined, setDeclined] = useState(0)
  const [botsCount, setBotsCount] = useState(0)
  const visitorsCollectionRef = collection(db, 'visitors')
  const botsCollectionRef = collection(db, 'bots')

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      if (result.user.email === import.meta.env.VITE_AUTH_EMAIL_2) {
        localStorage.setItem(xauth, true)
        setIsAuth(true)
        toast.success('Logged in.')
        navigate('/')
      } else {
        navigate('/')
        toast.error('Unauthorised user.')
      }
    })
  }

  const getStats = async () => {
    const data = await getDocs(visitorsCollectionRef)
    const id = 'u4lLbTDSbBNqPCepDnP2'
    const declinedInDb =
      data.docs[0]._document.data.value.mapValue.fields.declined.integerValue
    const agreedInDb =
      data.docs[0]._document.data.value.mapValue.fields.agreed.integerValue
    setAgreed(agreedInDb)
    setDeclined(declinedInDb)
    const bots = await getDocs(botsCollectionRef)
    const idBots = 'hHa4Lr1BXh2ggUZkNKHf'
    const botsInDb =
      bots.docs[0]._document.data.value.mapValue.fields.count.integerValue
    setBotsCount(botsInDb)
  }

  return (
    <>
      <div className='text-white h-[90vh]'>
        <div className='flex flex-col gap-4 m-4 items-start'>
          <h1
            className='text-green text-[25px] cursor-pointer'
            onClick={() => navigate('/')}
          >
            Home.
          </h1>

          <button
            onClick={signInWithGoogle}
            className='bg-green p-2 rounded-xl text-[25px]'
          >
            Log in with Google
          </button>
          <button
            onClick={() => getStats()}
            className='bg-green p-2 rounded-xl text-[25px]'
          >
            Get stats
          </button>
          <div className='ml-2 text-[25px]'>
            <p>Agreed: {agreed}</p>
            <p>Declined: {declined}</p>
            <p>Visitors total: {Number(agreed) + Number(declined)} </p>
            <p>Bots: {botsCount}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
