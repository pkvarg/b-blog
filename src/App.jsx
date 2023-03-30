import { useState } from 'react'
import { Home, Login, CreateBlog } from './pages'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  console.log(isAuth)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        {isAuth && <Route path='/create-blog' element={<CreateBlog />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App
