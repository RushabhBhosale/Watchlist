import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromApi } from '../../utils/api';
import { getSearchTerm } from '../../store/HomeSlice';
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    if (searchTerm) {
      fetchSearchData();
    }
  }, [searchTerm]);

  const fetchSearchData = () => {
    fetchDataFromApi(`/search/movie?query=${searchTerm}`)
      .then((res) => {
        dispatch(getSearchTerm(res));
        navigate('/search-results');
      })
      .catch((error) => {
        console.error('Error fetching search data:', error);
      });
  };

  return (
    <div>
      <input type="text" placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};

export default Search;
