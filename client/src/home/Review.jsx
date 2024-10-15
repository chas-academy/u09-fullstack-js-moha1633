import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from "react-icons/fa6";
import { Avatar } from "flowbite-react";
import propic from "../assets/banner-books/profile.jpg";  // Import profile picture
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// Import required Swiper modules
import { Pagination } from 'swiper/modules';

// Dummy review data
const reviews = [
  {
    id: 1,
    name: 'Mark Ping',
    title: 'CEO, Skogblad AB',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis sit sed obcaecati placeat dicta similique fugit.',
    rating: 4,
    img: propic
  },
  {
    id: 2,
    name: 'Alice Johnson',
    title: 'Product Manager, Example Inc.',
    text: 'Fantastic product! I have seen great results and it has really improved my workflow. Highly recommended!',
    rating: 5,
    img: propic
  },
  {
    id: 3,
    name: 'John Smith',
    title: 'Designer, Creative Co.',
    text: 'The quality is exceptional and the support team is incredibly helpful. Would definitely buy again !',
    rating: 4,
    img: propic
  },
  {
    id: 4,
    name: 'Jane Doe',
    title: 'Marketing Lead, Business Corp.',
    text: 'Great experience from start to finish. The features are intuitive and easy to use.',
    rating: 5,
    img: propic
  },
];

const Review = () => {
  return (
    <div className='my-12 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>
        Our Customers
      </h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className='shadow-lg bg-white py-6 px-4 md:m-4 rounded-lg border transition-transform transform hover:scale-105'>
              <div className="space-y-4">
                <div className='text-amber-500 flex gap-1 mb-2'>
                  {Array.from({ length: review.rating }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className='mb-4 text-gray-700'>{review.text}</p>
                <div className='flex items-center'>
                  <Avatar 
                    alt={`Avatar of ${review.name}`}
                    img={review.img}
                    rounded={true}
                    className='w-12 h-12 mr-3'
                  />
                  <div>
                    <h5 className='text-lg font-medium text-gray-900'>{review.name}</h5>
                    <p className='text-base text-gray-500'>{review.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Review;
