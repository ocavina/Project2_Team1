import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from '../Home/Home'
import Collection from '../Collection/collection'
import CardSearch from '../CardSearch/cardSearch'

function App() {
  


  return (
    <>
      <h1>Magic Digital Collection</h1>
      


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/search/:id" element={<CardSearch />} />
      </Routes>
    </>
  )
}

export default App
