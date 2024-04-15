import React from 'react';
import '../footer/footer.css';

const Footer = () => {
 return (
    <footer className="fsec bg-gray-800 text-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p>&copy; {new Date().getFullYear()} Lottery Website. All rights reserved.</p>
          <p className="mt-2">Contact us: <a href="mailto:contact@lotterywebsite.com" className="text-blue-400 hover:underline">contact@lotterywebsite.com</a></p>
          <div className="flex mt-4 space-x-4">
            <a href="https://www.facebook.com/lotterywebsite" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Facebook</a>
            <a href="https://www.twitter.com/lotterywebsite" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>
            <a href="https://www.instagram.com/lotterywebsite" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
 );
};

export default Footer;
