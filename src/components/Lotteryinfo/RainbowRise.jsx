import React from 'react';

const LotteryInfo = () => {

 return (
    <div className="bg-gray-100 rounded-lg shadow-md p-5 max-w-md mx-auto">
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-blue-500">Lottery Information</h1>
      </div>
      <div className="m-5">
        <h3 className="text-lg font-semibold m-5">How to Play Mega Millions Online</h3>
        <p>To play the Mega Millions lottery online, you must:</p>
        <div className="m-5">
        <h3 className="text-lg font-semibold m-5">Prizes and Rewards</h3>
        <p>If you match all 5 numbers, you win the jackpot! But don't worry, there are other prizes too:</p>
        <ul className="list-disc list-inside">
          <li>Match 4 numbers and you'll win a substantial amount.</li>
          <li>Match 3 numbers and you'll still receive a prize.</li>
          <li>Match 2 numbers and you'll get a smaller reward.</li>
          <li>Even if you only match 1 number, you'll still win a prize.</li>
        </ul>
      </div>
        <p>Read our detailed guide on <a href="/" className="text-blue-500 no-underline">How to Play Mega Millions online</a> or visit our <a href="/mega-millions-resource-centre" className="text-blue-500 no-underline">Mega Millions Resource Centre</a> for more help with playing the Mega Millions lottery online on Lotto247.</p>
      </div>
    </div>
 );
};

export default LotteryInfo;
