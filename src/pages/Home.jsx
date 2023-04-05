import React, { useState, useEffect, useCallback } from 'react'
import { Navbar, SinglePostIntro } from '../components'
import { toast } from 'react-hot-toast'
import { Posts, Contact } from './../sections'
import { useNavigate } from 'react-router-dom'
import { app } from './../firebaseConfig'
import { getAnalytics } from 'firebase/analytics'
import CookieConsent from 'react-cookie-consent'
import { db, xauth } from '../firebaseConfig'
import { facts } from './../assets/bibleFacts'

import {
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const Home = () => {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState()
  const [cookieAccept, setCookieAccept] = useState(false)
  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, 'posts')
  const visitorsCollectionRef = collection(db, 'visitors')

  // Initialize G-analytics on consent
  if (cookieAccept) {
    const analytics = getAnalytics(app)
  }

  const increaseVisitorsDeclined = async () => {
    const data = await getDocs(visitorsCollectionRef)
    const id = 'u4lLbTDSbBNqPCepDnP2'
    const declinedInDb =
      data.docs[0]._document.data.value.mapValue.fields.declined.integerValue
    const increaseDeclined = Number(declinedInDb) + Number(1)
    const docRef = doc(db, 'visitors', id)
    updateDoc(docRef, {
      declined: increaseDeclined,
    })
  }

  const increaseVisitorsAgreed = async () => {
    const data = await getDocs(visitorsCollectionRef)
    const id = 'u4lLbTDSbBNqPCepDnP2'
    const agreedInDb =
      data.docs[0]._document.data.value.mapValue.fields.agreed.integerValue
    const increaseAgreed = Number(agreedInDb) + Number(1)
    const docRef = doc(db, 'visitors', id)
    updateDoc(docRef, {
      agreed: increaseAgreed,
    })
  }

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
        toast.error(error)
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

      <div className='text-white flex flex-col justify-center mx-4 lg:mx-20 gap-10 mt-20'>
        <div className='flex flex-col justify-center gap-5'>
          {postList.map((post) => {
            return <SinglePostIntro key={post.id} post={post} />
          })}
        </div>

        <div className='text-white'>
          <h1 className='text-[37.5px] text-grey mt-15'>Some Bible Facts</h1>

          {facts.map((fact) => {
            return (
              <div key={fact.id}>
                <p className='text-[30px] text-green mt-1'>{fact.title}</p>
                {fact.points.map((point, index) => {
                  return (
                    <p key={index} className='text-[25px] text-left text-grey'>
                      - {point.point}
                    </p>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      <Contact />
      <CookieConsent
        location='bottom'
        style={{
          background: 'black',
          color: 'grey',
          fontSize: '22.5px',
          textAlign: 'justify',
        }}
        buttonStyle={{
          background: '#1d9f2f',
          color: '#fff',
          fontSize: '17.5px',
        }}
        buttonText='Agree'
        expires={365}
        enableDeclineButton
        onDecline={() => {
          setCookieAccept(false)
          increaseVisitorsDeclined()
        }}
        declineButtonStyle={{
          background: 'red',
          color: '#fff',
          fontSize: '17.5px',
        }}
        declineButtonText='Decline'
        onAccept={() => {
          setCookieAccept(true)
          increaseVisitorsAgreed()
        }}
      >
        This website uses analytical and operation necessary cookies. We use
        neither functional nor marketing cookies.{' '}
        {/* <a href='/gdpr'> GDPR</a> */}
      </CookieConsent>
    </>
  )
}

export default Home
