import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { getApiConfiguration, getRecommendations } from '../../store/HomeSlice';
import './Detail.css';

const Detail = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { url, recommendations } = useSelector((state) => state.home);

   const [displayedSeasons, setDisplayedSeasons] = useState(2);

   const loadMore = () => {
      setDisplayedSeasons(displayedSeasons + 100);
   }

   useEffect(() => {
      fetchMovieData();
      fetchRecommendations();
      // window.scroll(0,0)
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
                     <span className='year'>{url && url.first_air_date && <p className='fs-6'>Release: {new Date(url.first_air_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}<span className='vote d-md-none ms-3'>{url && url.vote_average.toFixed(2)}</span></p>}</span>
                     <span className='vote d-md-block d-none'>{url && url.vote_average && url.vote_average.toFixed(2)}</span>
                  </div>
                  <div className="movie-genre d-flex gap-2 text-white">Genres:
                     {url && url.genres && url.genres.map((genre, index) => (
                        <p key={index} className='fs-6 mb-0 text-white'>{genre.name}</p>
                     ))}
                  </div>
                  <div className='author'>
                     {url && url.created_by && url.created_by.length > 0 && (
                        <div className="writers d-flex mt-3 gap-3 fs-5">
                           <p className='fw-semibold fs-6'>Writers:</p>
                           {url.created_by.map((creator) => (
                              <p className='fw-semibold fs-6' key={creator.id}>{creator.name}</p>
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
         <div className="seasons mb-5 d-lg-flex ms-lg-5 ps-lg-5">
            <div className="col-lg-5 mb-5 px-3 px-lg-0">
               <h4>Additional Information</h4>
               <div>
                  <p className='fw-medium mb-1'>Status: {url.status}</p>
                  <p className='fw-medium mb-1'>Seasons: {url.number_of_seasons}</p>
                  <p className='fw-medium mb-1'>No of Episodes: {url.number_of_episodes}</p>
                  <p className='fw-medium mb-1'>Tagline: {url.tagline}</p>
                  <p className='fw-medium mb-1'>Votes: {url.vote_count}</p>
                  <p className='fw-medium mb-1'>Votes: {url.type}</p>
                  {url.production_companies?.map((production, index) => (
                     <span key={index} className='fw-medium mb-1'>Production: {production.name}</span>
                  ))}

               </div>
            </div>
            <div className="col-lg-3 d-none d-md-block">
               {url.created_by?.map((creator, index) => (
                  <div key={index} className='d-flex align-items-center mb-4'>
                     <div className="profile-image col-2">
                        {creator.profile_path && <img className='img-fluid' src={`https://image.tmdb.org/t/p/w200/${creator.profile_path}`} alt="" />}
                     </div>
                     <h5>{creator.name}</h5>
                  </div>
               ))}
            </div>
            <div className='px-lg-5 col-lg-3 px-3 px-lg-0'>
               <h4>Seasons</h4>
               <div className='row'>
                  {url.seasons?.slice(0, displayedSeasons).map((season) => (
                     <div className='mb-2' key={season.id}>
                        <div className="row">
                           <div className="col-4 d-none d-md-block">
                              <img className='img-fluid' src={`https://image.tmdb.org/t/p/w200/${season.poster_path}`} alt={`Season ${season.season_number}`} />
                           </div>
                           <div className="col-2 d-md-none">
                              <img className='img-fluid' src={`https://image.tmdb.org/t/p/w200/${season.poster_path}`} alt={`Season ${season.season_number}`} />
                           </div>
                           <div className="col-8 season-info">
                              <div>
                                 <p className='mb-0'>Season {season.season_number}: {season.name}</p>
                                 <p className='mb-0'>Episodes: {season.episode_count}</p>
                                 <p className='d-none d-md-block'>Air Date: {season.air_date || 'null'}</p>
                                 <p className='d-none d-md-block'>Rating: {season.vote_average || 'null'}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="btn bg-warning fw-semibold mt-3" onClick={loadMore}>
                  Load more
               </div>
            </div>
         </div>
         <div className='px-5 d-none d-md-block'>
            <h4>More like this:</h4>
            <div className='recommendations d-flex gap-3'>
               {recommendations && recommendations.results && recommendations.results.length > 0 && (
                  recommendations.results.slice(0, 6).map((recommendation, index) => (
                     <div key={index} className='rec-movie position-relative'>
                        <div className="rec-image">
                           <Link to={`/detail/${recommendation.id}`}>
                              <img className='img-fluid luffy'
                                 src={recommendation.poster_path ? `https://image.tmdb.org/t/p/w200/${recommendation.poster_path}` : ''}
                                 alt=""
                              />
                           </Link>
                        </div>
                        <div className="rec-title fw-semibold my-2 ps-2">
                           {recommendation.name}
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
         <div className='px-2 d-md-none '>
            <h4>More like this:</h4>
            <div className='recommendations d-flex'>
               {recommendations && recommendations.results && recommendations.results.length > 0 && (
                  recommendations.results.slice(0, 8).map((recommendation, index) => (
                     <div key={index} className='rec-movie w-25'>
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
