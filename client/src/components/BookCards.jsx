import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// 
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6'

const BookCards = ({ headline, books }) => {
  return (
    <div className="my-16 px-4 lg:px-24">
      <h2 className="text-5xl text-center font-bold text-black my-5">{headline}</h2>

      <Swiper
        slidesPerView={1} // Show one book per view by default
        spaceBetween={10} // Space between slides
        pagination={{ clickable: true }} // Enable pagination
        breakpoints={{
          640: {
            slidesPerView: 2, 
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <Link to={`/book/${book._id}`} className="block p-4">
              <div className="relative">
                <img
                  src={book.imageUrl}/>
                  <div className=' absolute top-3 righ-3 bg-red-600 hover:bg-black p-2 rounded'>
                    <FaCartShopping className='w-4-h-4 text-white'/>
                  </div>
              </div>
              <div className="text-center mt-4">
                <h3>{book.booktitle}</h3>
                <p>{book.authorName}</p>
               
              </div>
              <div>
              <p>¢10.00</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BookCards;
