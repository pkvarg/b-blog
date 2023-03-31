import { useState, useEffect } from 'react'
import { Home, Login, CreateBlog, Blog } from './pages'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/create-blog' element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
