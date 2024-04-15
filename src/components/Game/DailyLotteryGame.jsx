import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import LotteryInfo from '../Lotteryinfo/LotteryInfo';
import DailyTicket from '../ticket/DailyTicket';

const DailyGame = ({ gameName, total, ticketAmount }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [userName, setUserName] = useState('');
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketCode, setTicketCode] = useState(null);
  const [ticketsGenerated, setTicketsGenerated] = useState(0);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid } = user;
        try {
          const userRef = firebase.database().ref('users').child(uid);
          const snapshot = await userRef.once('value');
          const userData = snapshot.val();
          if (userData && userData.name) {
            setUserName(userData.name);
          }
        } catch (error) {
          console.error('Error fetching username from Firebase:', error);
        }
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleNumber = (number) => {
    if (selectedNumbers.length === 5 && !selectedNumbers.includes(number)) {
      return;
    }
    const updatedNumbers = selectedNumbers.includes(number)
      ? selectedNumbers.filter((num) => num !== number)
      : [...selectedNumbers, number];
    setSelectedNumbers(updatedNumbers);
  };

  const generateTicket = () => {
    if (ticketsGenerated >= 2) {
      setTicketModalOpen(false);
      setTicketCode(null);
      return;
    }

    const storedTicketCode = localStorage.getItem('dailyGameTicketCode');

    const code = storedTicketCode || Math.floor(10000000 + Math.random() * 90000000);

    localStorage.setItem('monthlyGameTicketCode', code);

    setTicketCode(code);
    setTicketModalOpen(true);
    setTicketsGenerated(ticketsGenerated + 1);
  };

  const renderNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 100; i++) {
      const isSelected = selectedNumbers.includes(i);
      numbers.push(
        <div
          key={i}
          className={`number ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md mr-2 mb-2 w-10 h-10 flex items-center justify-center border border-gray-300 shadow-md cursor-pointer`}
          onClick={() => toggleNumber(i)}>
          {i}
        </div>
      );
    }

    return (
      <div className='w-screen flex justify-center'>
        <div className='bg-green-500 h-[800px] w-[680px] rounded-xl'>
          <div className='p-6 bg-blue-300 w-max relative top-[140px] left-[40px] rounded-xl'>
            <div className="grid grid-cols-10 gap-x-2 mb-4 bg-blue-300 rounded-md w-max  ">
              {numbers}
            </div>
          </div>
          <button
            className="bg-blue-500 relative top-[180px] left-32 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={generateTicket}
            disabled={selectedNumbers.length !== 5}>
            Generate Ticket
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <LotteryInfo />
        <h2 className="text-2xl font-semibold mb-4">Select your numbers (1-100)</h2>
        <div className="mb-4">{renderNumbers()}</div>
        {ticketsGenerated >= 2 && (
          <p className="text-red-500">Sorry, the game is closed. No more tickets.</p>
        )}
      </div>
      {ticketModalOpen && (
        <DailyTicket
          gameName={gameName}
          userName={userName}
          selectedNumbers={selectedNumbers}
          ticketCode={ticketCode}
          ticketAmount={ticketAmount}
          total={total}
          closeModal={() => setTicketModalOpen(false)} />
      )}
    </div>
  );
};

export default DailyGame;
