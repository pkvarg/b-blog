import { useState, useEffect } from 'react'
import { Home, Login, CreateBlog, Blog, EditBlog, Surveys } from './pages'
import { Footer } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/edit-blog' element={<EditBlog />} />
        <Route path='/edit-blog/:id' element={<EditBlog />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/surveys' element={<Surveys />} />
      </Routes>
      <Toaster />
      <Footer />
    </BrowserRouter>
  )
}

export default App
