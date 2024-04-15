import React, { useState, useEffect } from 'react';
import MyTickets from '../MyTickets/MyTickets';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const currentUser = auth.currentUser;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserData(userData);
          } else {
            console.log('User document not found.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <>
      <div className="flex-col">
        <img className="w-screen h-[200px] object-fill" src={"https://i.postimg.cc/6pGDNWXG/money.png"} alt="Background" />
        <img className="rounded-full absolute top-[100px] left-[120px] w-[200px] h-[200px] ring-blue-600 ring-4 shadow-2xl max-[640]:-left-1" src={"https://i.postimg.cc/mg3x3f54/avatar.png"} alt="User Avatar" />
        <div className='h-screen flex gap-1 mt-1 max-sm:flex-wrap'>
          <div className='w-[435px] flex flex-col outline outline-2 items-center justify-center rounded-3xl shadow-sm bg-slate-50'>
            {userData && (
              <>
                <p className='text-lg font-semibold'>Country: {userData.country}</p>
                <p className='text-lg font-semibold'>Email: {userData.email}</p>
                <p className='text-lg font-semibold'>Mobile: {userData.mobile}</p>
                <p className='text-lg font-semibold'>Name: {userData.name}</p>
                <p className='text-lg font-semibold'>Time: {userData.time && new Date(userData.time.seconds * 1000).toLocaleString()}</p>
              </>
            )}
          </div>
          <div className='left-0 bg-white w-[1100px] outline outline-2 shadow-md rounded-3xl'>
            <MyTickets />
          </div>
        </div>
      </div>
    </>
  );  
}
