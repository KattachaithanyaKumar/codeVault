import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./Pages/pages.css"

//pages
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Admin from './Pages/Admin'
import Post from './Pages/Post'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/secret/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App