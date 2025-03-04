import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import Home from '../Home/Home'
import Collection from '../Collection/collection'
import CardSearch from '../CardSearch/cardSearch'
import CardInfo from '../CardInfo/cardInfo'
import detailsContext from '../assets/detailsContext'
import collectionContext from '../assets/collectionContext'

function App() {
  const [details, setDetails] = useState({})
  const value = {details, setDetails}

  const [collection, setCollection] = useState([]);
  const collectionState = {collection, setCollection};

  return (
    <>
      <Link to ={'/'}><h1>Magic Digital Collection</h1></Link>
      <Link to = {`/collection`}><button>My Collection</button></Link>
      
      <collectionContext.Provider value = {collectionState}>
      <detailsContext.Provider value = {value}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/search/:id" element={<CardSearch />} />
        <Route path="/cardInfo/:id" element={<CardInfo />} />
      </Routes>
      </detailsContext.Provider>
      </collectionContext.Provider>
    </>
  )
}

export default App
