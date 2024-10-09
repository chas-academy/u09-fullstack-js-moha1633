// Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import BestSellerBooks from './BestSellBooks';
import FavBook from './FavBook';
import PromoBanner from './PromoBanner';
import OtherBooks from './OtherBooks';

export const Home = () => {
  return (
    <div>
      <Banner />
      <BestSellerBooks />
      <FavBook/>
      <PromoBanner/>
      <OtherBooks/>
    </div>
  );
};

export default Home;
