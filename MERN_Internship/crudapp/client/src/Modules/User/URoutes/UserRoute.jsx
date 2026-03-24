import React from 'react'
import {Routes, Route} from 'react-router-dom'
import UHome from '../UComponents/UHome'
import Topbar from '../UComponents/Topbar'
import AboutPage from '../UComponents/AboutPage'
import HomePage from '../UComponents/HomePage'
import Register from '../UComponents/Register'
import Products from '../UComponents/Products'

export default function UserRoute() {
  return (
    <div>
      <Topbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/uhome' element={<UHome />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
      </Routes>
    </div>
  )
}
