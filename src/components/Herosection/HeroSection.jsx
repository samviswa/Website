import React, { useState, useEffect } from 'react';
import LotteryCard from '../Card/LotteryCard';
import '../Herosection/hero.css';

const HeroSection = () => {
 const carouselImages = [
    'https://i.postimg.cc/j5cJgzyr/images-1-1.jpg',
    'https://i.postimg.cc/gJhGrdkt/images-2-1.jpg',
    'https://i.postimg.cc/kg6Hj47v/ship.jpg',
 ];

 const [current, setCurrent] = useState(0);
 const length = carouselImages.length;

 useEffect(() => {
    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
 }, [current, length]);

 return (
    <section className='hero'>
      <div className="heroCon container mx-auto flex flex-col items-center justify-center ">
        <div className="bigImage flex flex-col items-center relative w-full h-64 md:h-96">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`inner mt-4 absolute w-full h-[350px] bg-no-repeat bg-center bg-cover ${index === current ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${image})`, transition: 'opacity 1s' }}>
              <h1 className="text-6xl font-extrabold mb-4 mt-12 text-center text-blue-950">Win Big with Our Lottery!</h1>
              <h2 className="text-2xl font-semibold mb-4 text-center">Your Chance to Win Big</h2>
              <p className="text-xl mb-6 text-center">Experience the thrill of winning with our easy-to-use lottery service. Join millions of players worldwide.</p>
              <div className="flex justify-center"> 
                <button className="bg-white text-black p-4 rounded-lg mt-8" to={ <LotteryCard/> }>Play Now</button>
              </div>     
           </div>
          ))}
        </div>
      </div>
    </section>
 );
};

export default HeroSection;
