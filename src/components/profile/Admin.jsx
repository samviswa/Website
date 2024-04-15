import React, { useState } from 'react';
import { db } from '../../firebase/firebase';

function AdminForm() {
  const [results, setResults] = useState({
    no1: '',
    no2: '',
    no3: '',
    no4: '',
    no5: '',
    collection: ''
  });

  const handleChange = (e) => {
    setResults({
      ...results,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addResultsToFirebase(results);
  };

  const addResultsToFirebase = async (results) => {
    try {
      const formattedNumbers = {
        no1: parseInt(results.no1, 10),
        no2: parseInt(results.no2, 10),
        no3: parseInt(results.no3, 10),
        no4: parseInt(results.no4, 10),
        no5: parseInt(results.no5, 10)
      };
      const data = {
        numbers: formattedNumbers,
      };

      let collectionRef;

      switch (results.collection) {
        case "Daily Result":
          collectionRef = db.collection("Daily Result");
          break;
        case "Weekly Result":
          collectionRef = db.collection("Weekly Result");
          break;
        case "Monthly Result":
          collectionRef = db.collection("Monthly Result");
          break;
        default:
          console.error("Invalid collection selected");
          return;
      }

      await collectionRef.add(data);
      console.log(`Results added to collection ${results.collection}`);
    } catch (error) {
      console.error("Error adding results: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no1">
            No1
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="no1" value={results.no1} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no2">
            No2
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="no2" value={results.no2} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no3">
            No3
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="no3" value={results.no3} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no4">
            No4
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="no4" value={results.no4} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no5">
            No5
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="no5" value={results.no5} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="collection">
            Collection
          </label>
          <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="collection" value={results.collection} onChange={handleChange} required>
            <option value="">Select a collection</option>
            <option value="Daily Result">Daily Result</option>
            <option value="Weekly Result">Weekly Result</option>
            <option value="Monthly Result">Monthly Result</option>
          </select>
        </div>

        {results.collection === "Daily Result" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lotteryName">
              Lottery Name (Daily)
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lotteryName" required>
              <option value="">Select a lottery</option>
              <option value="Ball buster">Ball buster</option>
              <option value="Pocket & Rockets">Pocket & Rockets</option>
              <option value="Trick shots">Trick shots</option>
            </select>
          </div>
        )}

        {results.collection === "Weekly Result" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lotteryName">
              Lottery Name (Weekly)
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lotteryName" required>
              <option value="">Select a lottery</option>
              <option value="Cascade">Cascade</option>
              <option value="Charmstrike">Charmstrike</option>
              <option value="Knock knock">Knock knock</option>
              <option value="Power ball">Power ball</option>
            </select>
          </div>
        )}

        {results.collection === "Monthly Result" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lotteryName">
              Lottery Name (Monthly)
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="lotteryName" required>
              <option value="">Select a lottery</option>
              <option value="Minted Millions">Minted Millions</option>
              <option value="Golden box">Golden box</option>
              <option value="King&Queen">King&Queen</option>
              <option value="Lot set">Lot set</option>
              <option value="Mega power">Mega power</option>
              <option value="Power swipe">Power swipe</option>
              <option value="Rainbow Rise">Rainbow Rise</option>
              <option value="Shining treasure">Shining treasure</option>
              <option value="Silver foxes">Silver foxes</option>
              <option value="Syndicate star">Syndicate star</option>
              <option value="Turkey shoot">Turkey shoot</option>
              <option value="Winfinity">Winfinity</option>
            </select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
