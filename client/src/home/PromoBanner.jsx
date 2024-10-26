import React from 'react';
import { Link } from 'react-router-dom'; 
//import Bookstagram from "../assets/banner-books/Bookstagram.jpg"

const PromoBanner = () => {
  return (
    <div className='mt-16 py-12 bg-teal-100 px-4 lg:px-12'>
       <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
       <div className='md:w-1/2'>
            {/* Corrected className from 'test-4X1' to 'text-4xl' */}
            <h2 className='text-4xl font-bold mb-6 leading-snug'>
                2024 National Book Awards for Fiction Shortlist
            </h2>
            {/* Use Link instead of link */}
            <Link to="/shop" className=' block'>
                <button className='bg--700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>
                    Get Promo 
                </button>
            </Link>
        </div>
        <div>
            <img src="/Bookstagram.jpg" alt="" className='w-96' />
        </div>
       </div>
    </div>
  );
}

export default PromoBanner;
