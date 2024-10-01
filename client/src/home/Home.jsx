// Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import FavoriteBooks from './FavoriteBooks'; // Corrected import

export const Home = () => {
  return (
    <div>
      <Banner />
      <FavoriteBooks />
    </div>
  );
};

export default Home;
