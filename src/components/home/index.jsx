import React, { useState, useEffect } from 'react';
import LotteryCarousel from '../carousel/Carousal';
import LotteryCard from '../Card/LotteryCard';
import Header from '../header';
import Footer from '../footer/Footer';
import HeroSection from '../Herosection/HeroSection';
import loader from '../Loader/animated.gif';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      <div className="home">
        <Header />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <img src={loader} alt="Loading..." className="h-48 w-48" />
          </div>
        ) : (
          <>
            <h1 className='text-center text-4xl font-medium'>Welcome to the Lottery Website</h1>
            <HeroSection />
            <LotteryCarousel />
            <div className="lottery-cards">
              <LotteryCard />
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
