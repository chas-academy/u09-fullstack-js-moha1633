import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Import images for the books
import BestBookImg1 from "../assets/BestBook.png";


function FavBook() {
    return (
        <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
            <div className='md:w-1/2'>
                {/* Display both book images using unique variable names */}
                <div className='grid grid-cols-2 gap-4'>
                    <img src={BestBookImg1} alt="BestBook Book 1" className=' rounded md:w-10/12-cover'/>
            
                </div>
            </div>
            <div className='md:w-1/2'>
                <h2 className='text-5xl font-bold my-5 md:w-3/4 leading-snug'>
                    Find Your Favorite <span className='text-red-700'>Book Here!</span>
                </h2>
                <p className='mb-10 text-lg md:w-5/6'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Illum repellat iure quibusdam nobis magnam dolore. 
                    Voluptatem velit, explicabo dignissimos tenetur voluptate, 
                    odio ipsum harum nulla, eveniet dolor ea. Illo, id?
                </p>
                <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
                    <div>
                        <h3 className='text-3xl font-bold'>800+</h3>
                        <p className='text-base'>Book Listings</p>
                    </div>
                    <div>
                        <h3 className='text-3xl font-bold'>600+</h3>
                        <p className='text-base'>Registered Users</p>
                    </div>
                    <div>
                        <h3 className='text-3xl font-bold'>500+</h3>
                        <p className='text-base'>PDF Downloads</p>
                    </div>
                </div>
                {/* Button with Link */}
                <Link to="/shop" className='mt-12 block'>
                    <button className='bg-red-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>
                        Explore More
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default FavBook;
