import React, { useState } from 'react';
import Razorpay from 'razorpay';

const Payment = ({ amount, onSuccess }) => {
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();

      const options = {
        key: 'YOUR_RAZORPAY_KEY',
        amount: data.amount,
        currency: 'INR',
        name: 'Lottery Ticket Purchase',
        description: 'Purchase Lottery Ticket',
        order_id: data.id,
        handler: function (response) {
          console.log(response);
          onSuccess(response);
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError('An error occurred during payment initiation');
      console.error(error);
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <button onClick={handlePayment}>Purchase Ticket</button>
    </div>
  );
};

export default Payment;