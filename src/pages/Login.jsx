import React from 'react'
import { auth, provider } from './Home'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate()
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

  return (
    <>
      <p className='text-center m-4'>Login</p>
      <div className='flex flex-col gap-4 m-4 items-start'>
        <button onClick={() => navigate('/')}>Home</button>

        <button onClick={signInWithGoogle}>Log in with Google</button>
      </div>
    </>
  )
}

export default Login
