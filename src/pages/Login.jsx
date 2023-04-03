import React, { useState } from 'react'
import { auth, provider, xauth } from './../firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState()

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
        </div>
      </div>
    </>
  )
}

export default Login
