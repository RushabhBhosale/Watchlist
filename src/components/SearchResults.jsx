import React from 'react'
import { useSelector } from 'react-redux'

const SearchResults = () => {

   const {search} = useSelector((state) => state.home)

   return (
      <div>
         {search && search.results?.map((search, index) => (
            <p key={index}>{search.title}</p>
         ))}
      </div>
   )
}

export default SearchResults