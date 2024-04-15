import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../carousel/carousal.css';

const LotteryCarousel = () => {
 const [lotteryData, setLotteryData] = useState([]);
 const carouselRef = useRef(null);

 useEffect(() => {
    const fetchData = async () => {
      const collections = ['Monthly Result', 'Weekly Result', 'Daily Result'];
      let allData = [];

      for (const collectionName of collections) {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          winningNumbers: [doc.data().no1, doc.data().no2, doc.data().no3, doc.data().no4, doc.data().no5]
        }));
        allData = [...allData, ...data];
      }

      const duplicatedData = [...allData, ...allData,...allData,...allData];
      setLotteryData(duplicatedData);
    };

    fetchData();
 }, []);

 useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollInterval = setInterval(() => {
        carousel.scrollLeft += 1;
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft = carousel.scrollWidth / 2;
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
 }, [lotteryData]);

 return (
    <div className="slide carousel overflow-x-hidden flex p-4" ref={carouselRef}>
      {lotteryData.map((game, index) => (
        <div key={index} className="smallCard -mt-2 carousel-item flex-shrink-0 w-72 mr-4 p-4 bg-gradient-to-tr from-blue-600 via-blue-200 to-blue-500 rounded-md hover:scale-105 shadow-xl">
          <h3 className="text-xl font-bold mb-2">{game.id}</h3>
          <p className="text-gray-700">Winning Numbers: {game.winningNumbers.join(' ')}</p>
        </div>
      ))}
    </div>
 );
};

export default LotteryCarousel;
