import React from 'react'
import { auth, provider } from './Home'
import { signInWithPopup } from 'firebase/auth'

const Login = ({ setIsAuth }) => {
  const signInWithGoogle = () => {
    signInWithGoogle(auth, provider).then((result) => {
      setIsAuth(true)

      // 2509
    })
  }

  return (
    <>
      <p>Login</p>
      <button>Log in with Google</button>
    </>
  )
}

export default Login
