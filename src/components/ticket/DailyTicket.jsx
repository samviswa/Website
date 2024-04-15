import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import '../../components/ticket/ticket.css';

const DailyTicket = ({ gameName, userName, selectedNumbers, ticketCode, ticketAmount, total }) => {
  const ticketRef = useRef(null);
  const [downloaded, setDownloaded] = useState(false);
  const storage = getStorage();

  const currentDate = new Date().toLocaleDateString();

  const downloadTicket = async () => {
    try {
      const ticketElement = ticketRef.current;
      const canvas = await html2canvas(ticketElement);
      const blob = await new Promise(resolve => canvas.toBlob(resolve));
      const ticketImageRef = ref(storage, `Daily Tickets/${ticketCode}.png`);
      await uploadBytes(ticketImageRef, blob);
      console.log("Ticket image uploaded successfully!");
      setDownloaded(true);
    } catch (error) {
      console.error("Error uploading ticket image:", error);
    }
  };

  return (
    <div className='w-full flex items-center justify-center mt-[100px] ' ref={ticketRef}>
      <div className='w-[800px] h-[300px] bg-[#DBA979] flex'>
        <div className='bg-[#ECCA9C] w-[600px] h-[300px]'>
          <div className='relative right-3 w-max h-[300px] flex flex-col gap-1'>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
            <div className='w-6 h-6 bg-white rounded-full'></div>
          </div>
          <h2 className="title text-3xl relative shadow-sm -top-[250px] ultra-regular text-center">Daily Lottery Ticket</h2>
          <p className="text-xl font-black relative -top-[250px] -right-[210px]">{selectedNumbers.join(' , ')}</p>
          <img src={"https://i.postimg.cc/HWc0yrj1/corner.png"} className='corner relative -top-[280px] opacity-35 -left-[35px] w-[250px] h-[250px]' alt=''/>
          <img src='https://i.postimg.cc/KvmzyW6p/topcorner.png' className='tcorner relative -right-[620px] opacity-35 -top-[650px] w-[200px] h-[200px]' alt=''/>
          <div className='textbox w-max relative -top-[700px] left-[350px] flex flex-col items-end' >
            <p className="mb-2 mt-5 archivo-black-regular"><span className="text-black">Game:</span>{gameName}</p>
            <p className="mb-2 archivo-black-regular"><span className="text-black">User:</span> {userName}</p>
            <p className="mb-2 archivo-black-regular"><span className="text-black">Total Amount:</span> ₹{total}</p>
            <p className="mb-2 archivo-black-regular"><span className="text-black">Ticket Price:</span> ₹{ticketAmount}</p>
          </div>
        </div>

        <div className='relative left-[190px] w-max h-[300px] flex flex-col gap-1'>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
          <div className='w-6 h-6 bg-white rounded-full'></div>
        </div>
        <div className="flex-col justify-center items-center w-max h-max relative top-[165px] left-[20px]">
          <QRCode value={ticketCode.toString()} size={100} className='qrcode outline-double outline-8 opacity-20' />
          <p className="text-bold relative top-3 text-center">MM{ticketCode}</p>
        </div>
      </div>
      {!downloaded && (
        <div className="flex justify-center relative top-[200px]">
          <button onClick={downloadTicket} className="bg-yellow-300 hover:bg-opacity-10 text-blue-800 font-bold py-2 px-4 rounded">
            Download Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyTicket;