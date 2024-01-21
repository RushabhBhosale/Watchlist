import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { getApiConfiguration, getRecommendations } from '../../store/HomeSlice';
import './Detail.css';

const Detail = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { url, recommendations } = useSelector((state) => state.home);
   console.log(recommendations)

   useEffect(() => {
      fetchMovieData();
      fetchRecommendations();
      window.scroll(0,0)
   }, [id]);

   const fetchMovieData = () => {
      fetchDataFromApi(`/tv/${id}`)
         .then((res) => {
            dispatch(getApiConfiguration(res));
         });
   };

   const fetchRecommendations = () => {
      fetchDataFromApi(`/tv/${id}/recommendations`)
         .then((res) => {
            dispatch(getRecommendations(res))
         })
   }

   return (
      <div>
         <div className="poster-img w-100">
            {url && url.backdrop_path && <img className='img-fluid backdrop' src={`https://image.tmdb.org/t/p/original/${url.backdrop_path}`} alt="Backdrop" />}

            <div className='d-md-flex movie-details'>
               <div className="movie-img">
                  {url && url.poster_path && <img className='img-fluid' src={`https://image.tmdb.org/t/p/original/${url.poster_path}`} alt='poster'></img>}
               </div>
               <div className='movie-info'>
                  <div className="movie-title">
                     {url && url.original_name && <h3>{url.name}</h3>}
                  </div>
                  <div className='movie-year d-md-flex align-items-center'>
                     <span className='year'>{url && url.first_air_date && <p className='fs-6'>Release: {new Date(url.first_air_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}<span className='vote d-md-none ms-3'>{url && url.vote_average}</span></p>}</span>
                     <span className='vote d-md-block d-none'>{url && url.vote_average}</span>
                  </div>
                  <div className="movie-genre d-flex gap-2 text-white">Genres:
                     {url && url.genres && url.genres.map((genre, index) => (
                        <p key={index} className='fs-6 mb-0 text-white'>{genre.name}</p>
                     ))}
                  </div>
                  <div className='author'>
                     {url && url.created_by && url.created_by.length > 0 && (
                        <div className="writers d-flex mt-3 gap-3 fs-5">
                           <p className='fw-semibold'>Writers:</p>
                           {url.created_by.map((creator) => (
                              <p className='fw-semibold' key={creator.id}>{creator.name}</p>
                           ))}
                        </div>
                     )}
                  </div>
                  <div className="overview fw-medium my-3">
                     {url && url.overview && <p>{url.overview}</p>}
                  </div>
                  <div>
                     {url && url.popularity && <p className='fs-5 fw-medium text-black-50'>Popularity: {url.popularity}</p>}
                  </div>
               </div>
            </div>
         </div>

         <div className='px-5 d-none d-md-block'>
            <h4>More like this:</h4>
            <div className='recommendations d-flex gap-1'>
               {recommendations && recommendations.results && recommendations.results.length > 0 && (
                  recommendations.results.slice(0, 7).map((recommendation) => (
                     <div className='rec-movie'>
                        <div className="rec-image">
                           <Link to={`/detail/${recommendation.id}`}>
                              <img className='img-fluid'
                                 src={recommendation.poster_path ? `https://image.tmdb.org/t/p/w200/${recommendation.poster_path}` : ''}
                                 alt=""
                              />
                           </Link>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
         <div className='px-2 d-md-none'>
            <h4>More like this:</h4>
            <div className='recommendations d-flex'>
               {recommendations && recommendations.results && recommendations.results.length > 0 && (
                  recommendations.results.slice(0, 8).map((recommendation) => (
                     <div className='rec-movie w-25'>
                        <div className="rec-image">
                           <Link to={`/detail/${recommendation.id}`}>
                              <img className='img-fluid'
                                 src={recommendation.poster_path ? `https://image.tmdb.org/t/p/w200/${recommendation.poster_path}` : ''}
                                 alt=""
                              />
                           </Link>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
      </div>
   );
};

export default Detail;
