import React, { useState } from 'react'
import { auth, provider } from './Home'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState()

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log(result.user.email)
      if (result.user.email === import.meta.env.VITE_AUTH_EMAIL_2) {
        localStorage.setItem('isAuth', true)
        setIsAuth(true)
        navigate('/create-blog')
      } else {
        navigate('/')
        alert('Unauthorised user')
      }
    })
  }

  console.log('login auth:', isAuth)

  return (
    <>
      <div className='text-white'>
        <div className='flex flex-col gap-4 m-4 items-start'>
          <h1
            className='text-green text-[25px] ml-6 cursor-pointer'
            onClick={() => navigate('/')}
          >
            Refresh Your Spirit of Faith.
          </h1>

          <button onClick={signInWithGoogle}>Log in with Google</button>
        </div>
      </div>
    </>
  )
}

export default Login
