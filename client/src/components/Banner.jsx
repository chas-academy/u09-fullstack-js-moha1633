import React from 'react'
import { BannerCard } from '../home/BannerCard'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-blend-teal flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>



        {/* left side  */}
        <div className='md:w-1/2 space-x-8 h-full'>

        
        <h2 className='text-5xl font-bold leading-snug text-black'>Buy and sell Your Books <span className='text-red-700'>for the Best prices</span></h2>
        <p className='md:w-4/5 '>
          Hitta de bästa böckerna till fantastiska priser eller sälj dina
          använda böcker till andra bokälskare. Oavsett om du letar efter en
          ny läsupplevelse eller vill ge dina böcker ett nytt hem, erbjuder vi
          en enkel och trygg plattform för dig att köpa och sälja böcker. 
          Börja din bokresa idag!
        </p>
        <div className='flex space-x-2'>
            <input type="search" name='search' id='search' placeholder='search abook' className='py-2 px-2 rounded-s-sm outline-none' />
            <button className='bg-red-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>Search</button>
        </div>
        </div>
        {/* right side  */}
        <div>
            <BannerCard></BannerCard>

        </div>
      </div>
    </div>
  )
}

export default Banner
