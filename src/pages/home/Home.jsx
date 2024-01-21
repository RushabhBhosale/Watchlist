import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromApi } from '../../utils/api';
import { getApiConfiguration, getGenres } from '../../store/HomeSlice';
import './Home.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/modules'
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { url, genres } = useSelector((state) => state.home);

  useEffect(() => {
    fetchTopRatedTv();
    fetchGenres();
  }, []);

  function getGenreById(genreId) {
    if (genres && genres.genres) {
      for (let i = 0; i < genres.genres.length; i++) {
        const id = genres.genres[i].id;
        const name = genres.genres[i].name;
        if (id == genreId) {
          return name
        }
      }
    }
  }

  const fetchTopRatedTv = () => {
    fetchDataFromApi('/tv/top_rated')
      .then((res) => {
        dispatch(getApiConfiguration(res));
      })
  };

  const fetchGenres = () => {
    fetchDataFromApi('/genre/tv/list')
      .then((res) => {
        dispatch(getGenres(res))
      })
  }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {url?.results ? (
          url.results.map((movie) => (
            <SwiperSlide className='slides' key={movie.id}>
              <div className="poster-image">
                <img className='img-fluid' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
              </div>
              <div className="poster-overlay">
                <h1 className='title'>{movie.name}</h1>
                <div className="date">
                  <span className='d-flex genres mb-2'>{movie.genre_ids.slice(0, 3).map((genre, index) => <p key={index}>{getGenreById(genre)}</p>)}</span>
                  <span className='vote mb-2'>{movie.vote_average}</span>
                </div>
                <p className='synopsis text-white w-75 d-none d-md-block'>{movie.overview.slice(0, 600) + '...'}</p>
                <p className='synopsis text-white d-md-none'>{movie.overview.slice(0, 200) + '...'}</p>
                <div className="btn-box">
                  <Link to={`/detail/${movie.id}`}>
                    <div className="btns play"><i className="fa-solid fa-play"></i>Play</div>
                  </Link>
                  <Link to={`/detail/${movie.id}`}>
                    <div className="btns info"><i className="fa-solid text-white fs-4 fa-circle-info"></i>More Info</div>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No data available</p>
        )}
      </Swiper>
    </div>
  );
};

export default Home;
