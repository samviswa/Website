import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { BsTags } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { IoIosInformationCircleOutline } from "react-icons/io";
import MonthlyGame from '../Game/MonthlyLotteryGame';
import DailyGame from '../Game/DailyLotteryGame';
import WeeklyGame from '../Game/WeeklyLotteryGame';
import { collection, getDocs } from 'firebase/firestore';
import '../Card/Card.css';

const LotteryCard = () => {
  const [lotteryData, setLotteryData] = useState({
    monthly: [],
    weekly: [],
    daily: []
  });

  const MonthlyClick = (gameName, total, ticketAmount) => {
    return <MonthlyGame gameName={gameName} total={total} ticketAmount={ticketAmount} />;
  };

  const WeeklyClick = (gameName, total, ticketAmount) => {
    return <WeeklyGame gameName={gameName} total={total} ticketAmount={ticketAmount} />;
  };

  const DailyClick = (gameName, total, ticketAmount) => {
    return <DailyGame gameName={gameName} total={total} ticketAmount={ticketAmount} />;
  };

  useEffect(() => {
    const fetchData = async () => {
      const collections = ['Monthly Result', 'Weekly Result', 'Daily Result'];
      let allData = {
        monthly: [],
        weekly: [],
        daily: []
      };

      for (const collectionName of collections) {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map(doc => ({
          name: doc.id,
          ticketAmount: doc.data().ticketAmount,
          total: doc.data().total
        }));

        if (collectionName === 'Monthly Result') {
          allData.monthly = data;
        } else if (collectionName === 'Weekly Result') {
          allData.weekly = data;
        } else if (collectionName === 'Daily Result') {
          allData.daily = data;
        }
      }

      setLotteryData(allData);
    };

    fetchData();
  }, []);

  const [monthlyTime, setMonthlyTime] = useState('0d : 0h : 0m : 0s');
  const [weeklyTime, setWeeklyTime] = useState('0d : 0h : 0m : 0s');
  const [dailyTime, setDailyTime] = useState('0h : 0m : 0s');

  useEffect(() => {
    const updateTimers = () => {
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()));
      const nextDay = new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0);

      const calculateTime = (date) => {
        const diff = date - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
      };

      setMonthlyTime(calculateTime(nextMonth));
      setWeeklyTime(calculateTime(nextWeek));
      setDailyTime(calculateTime(nextDay));
    };

    updateTimers();
    const intervalId = setInterval(updateTimers, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="cardCon rounded-lg shadow-md p-5 mx-auto flex-col gap-5 justify-center items-center">
      <h3 className="text-3xl font-extrabold m-5 text-center">Monthly Offers</h3>
      <div className="m-5 flex flex-wrap justify-center gap-5 bg-gradient-to-b">
        {lotteryData.monthly.map((offer, index) => (
          <div key={index} className="box rounded-lg p-4 mb-1 w-[400px] h-[200px] shadow-xl  transform hover:scale-105 ">
            <div className='bg-gradient-to-b h-12 from-slate-200 to-slate-300 w-[400px] -ml-4 -mt-4 '> 
            <h4 className="text-lg alfa text-blue-800 p-2">{offer.name}</h4>
            </div>
            <h1 className="text-2xl font-extrabold mt-4 mb-2">₹ {offer.total}</h1>
            <div className='flex flex-row items-center gap-2'>
              <BsTags />
              <p className="text-gray-600">₹ {offer.ticketAmount}</p>
            </div>
            <div className="flex items-center">
              <LuAlarmClock />
              <span className="ml-2">{monthlyTime}</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <IoIosInformationCircleOutline color='blue' />
              <a href="/lottery-info" className="text-blue-500 no-underline">
                <span>About</span>
              </a>
            </div>
            <a href="/monthly" className='flex justify-center'>
              <button className="border-yellow-500 border-2 font-bold rounded-full text-yellow-500 -mt-5 -mr-64 w-28 p-1 cursor-pointer" type="button" onClick={() => MonthlyClick(offer.name, offer.total, offer.ticketAmount)}>Play now</button>
            </a>
          </div>
        ))}
      </div>

      <h3 className="text-3xl font-extrabold m-5 text-center">Weekly Offers</h3>
      <div className="m-5 flex flex-wrap  justify-center gap-5 ">
        {lotteryData.weekly.map((offer, index) => (
          <div key={index} className="box rounded-lg p-4 mb-1 w-[400px] h-[200px] shadow-xl  transform hover:scale-105 ">
          <div className='bg-gradient-to-b h-12 from-slate-200 to-slate-300 w-[400px] -ml-4 -mt-4 '> 
            <h4 className="text-lg alfa text-blue-800 p-2">{offer.name}</h4>
            </div>            
            <h1 className="text-2xl font-extrabold mt-4 mb-2">₹ {offer.total}</h1>
            <div className='flex flex-row items-center gap-2'>
              <BsTags />
              <p className="text-gray-600">₹ {offer.ticketAmount}</p>
            </div>
            <div className="flex items-center">
              <LuAlarmClock />
              <span className="ml-2">{weeklyTime}</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <IoIosInformationCircleOutline color='blue' />
              <a href="/lottery-info" className="text-blue-500 no-underline">
                <span>About</span>
              </a>
            </div>
            <a href="/weekly" className='flex justify-center'>
            <button className="border-yellow-500 border-2 font-bold rounded-full text-yellow-500 -mt-5 -mr-64 w-28 p-1 cursor-pointer" type="button" onClick={() => WeeklyClick(offer.name, offer.total, offer.ticketAmount)}>Play now</button>
            </a>
          </div>
        ))}
      </div>
      
      <h3 className="text-3xl font-extrabold m-5 text-center">Daily Offers</h3>
      <div className="m-5 flex flex-wrap  justify-center gap-5 ">
        {lotteryData.daily.map((offer, index) => (
          <div key={index} className="box rounded-lg p-4 mb-1 w-[400px] h-[200px] shadow-xl  transform hover:scale-105 ">
          <div className='bg-gradient-to-b h-12 from-slate-200 to-slate-300 w-[400px] -ml-4 -mt-4 '> 
            <h4 className="text-lg alfa text-blue-800 p-2">{offer.name}</h4>
            </div>
            <h1 className="text-2xl font-extrabold mt-4 mb-2">₹ {offer.total}</h1>
            <div className='flex flex-row items-center gap-2'>
              <BsTags />
              <p className="text-gray-600">₹ {offer.ticketAmount}</p>
            </div>
            <div className="flex items-center">
              <LuAlarmClock />
              <span className="ml-2">{dailyTime}</span>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <IoIosInformationCircleOutline color='blue' />
              <a href="/lottery-info" className="text-blue-500 no-underline">
                <span>About</span>
              </a>
            </div>
            <a href="/daily" className='flex justify-center'>
            <button className="border-yellow-500 border-2 font-bold rounded-full text-yellow-500 -mt-5 -mr-64 w-28 p-1 cursor-pointer" type="button" onClick={() => DailyClick(offer.name, offer.total, offer.ticketAmount)}>Play now</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotteryCard;
