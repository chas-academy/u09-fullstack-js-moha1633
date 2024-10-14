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
          <SwiperSlide>
            <div className="space-y-6">
              <div className='text-amber-500 flex gap-1 mb-3'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              {/** Review Text */}
              <div className='mt-7'>
                <p className='mb-5'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis sit sed obcaecati placeat dicta similique fugit.
                  Modi dolor ab blanditiis fugit perspiciatis aut quae ex, accusantium deserunt,
                  eius voluptas sit!
                </p>
                {/** Avatar with Profile Picture */}
                <Avatar 
                  alt="Avatar of Jese"
                  img={propic}  // Image source for the profile picture
                  rounded={true}  // Makes the avatar image circular
                  className='w-10 mb-4'  // Set the size of the avatar (smaller size)
                />
              <h5 className='text-lg font-medium '>Mark ping</h5>
              <p className='text-base'>CEO,Skogblad AB</p>
              </div>
            </div>
          </SwiperSlide>

          {/* Additional Slides */}
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Review;
