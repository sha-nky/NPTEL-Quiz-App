import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Navbar, Footer } from "./Components"
import { Quiz } from "./Pages"

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
