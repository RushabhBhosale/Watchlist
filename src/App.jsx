import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Anime from './pages/ANime'
import Navbar from './components/Navbar/Navbar'
import Movie from './pages/Movie'
import Webseries from './pages/Webseries'
import Detail from './pages/Detail/Detail'
import SearchResults from './components/SearchResults'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/anime' element={<Anime />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/webseries' element={<Webseries />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/search-results' element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App