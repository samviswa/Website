import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyDy2zV4JEZ-dy7kUqMFqkD9zphF8wGAryo",
  authDomain: "lotteryapp-70d69.firebaseapp.com",
  databaseURL: "https://lotteryapp-70d69-default-rtdb.firebaseio.com",
  projectId: "lotteryapp-70d69",
  storageBucket: "lotteryapp-70d69.appspot.com",
  messagingSenderId: "844463272072",
  appId: "1:844463272072:web:7cd8c6edf8c5bd211f6f3d",
  measurementId: "G-3QY24EV9DP"
};

firebase.initializeApp(firebaseConfig);

const MyTickets = () => {
 const [user, setUser] = useState(null);
 const [userImages, setUserImages] = useState([]);

 useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserImages(user.uid);
      } else {
        setUser(null);
        setUserImages([]);
      }
    });

    return () => {
      unsubscribe();
    };
 }, []);

 const fetchUserImages = async (userId) => {
    try {
      const storageRef = firebase.storage().ref();
      const userImagesRef = storageRef.child(`users/${userId}/images`);

      const imageList = await userImagesRef.listAll();

      const urls = await Promise.all(
        imageList.items.map(item => item.getDownloadURL())
      );

      setUserImages(urls);
    } catch (error) {
      console.error('Error fetching user images:', error);
    }
 };

 const renderImages = () => {
    if (!user) {
      return <div className="text-center">Please log in to view your tickets</div>;
    }

    if (userImages.length === 0) {
      return <div className="text-center">No Tickets</div>;
    }

    return (
      <div className="flex flex-wrap justify-center">
        {userImages.map((imageUrl, index) => (
          <div key={uuidv4()} className="m-4">
            <img
              src={imageUrl}
              alt={`Ticket ${index + 1}`}
              className="max-w-xs max-h-xs"
              onError={(e) => {
                e.target.src = "https://i.postimg.cc/1XwsdRP3/no-ticket-sign-illustration-260nw-547018174-930003216.jpg";
              }}/>
          </div>
        ))}
      </div>
    );
 };

 return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Tickets</h2>
      {renderImages()}
    </div>
 );
};

export default MyTickets;