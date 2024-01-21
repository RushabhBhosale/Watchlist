import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataFromApi } from '../utils/api';
import { getApiConfiguration, getGenres } from '../store/HomeSLice';

const Home = () => {
   const dispatch = useDispatch();

   const { url, genres } = useSelector((state) => state.home);
   console.log(genres)
   useEffect(() => {
      fetchData();
      fetchGenres();
   }, [])

   const fetchData = () => {
      fetchDataFromApi('/tv/popular')
         .then((res) => {
            dispatch(getApiConfiguration(res))
         })
   }

   const fetchGenres = () => {
      fetchDataFromApi('/genre/tv/list')
         .then((res) => {
            dispatch(getGenres(res.genres))
         })
   }

   console.log()
   return (
      <>
         <div>
            {url?.results ? (
               url.results.map((item) => (
                  <div key={item.id}>
                     {item.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} />
                     ) : (
                        <p>No poster</p>
                     )}

                     <p>{item.original_name}</p>
                  </div>
               ))
            ) : (
               <p>No data available</p>
            )}
         </div>

         <div>
         {Array.isArray(genres) ? (
               genres.map((genre) => (
                  <h6 key={genre.id}>{genre.name}</h6>
               ))
            ) : (
               <p>No genres available</p>
            )}
         </div>
      </>
   );

}

export default Home