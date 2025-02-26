"use client"
import { useEffect, useState } from "react";

const Table = () => {
  const [keys, setKeys] = useState(null)
  const [data, setData] = useState(null)

  const fetchData = () => {
    fetch('https://sip2024-backend.onrender.com/api/data/get', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://interntezu.netlify.app',
        'Access-Control-Allow-Credentials': 'true',
      },
      credentials: 'include',
      mode: 'cors',
    })
    .then(res => {
      if (!res.ok) throw new Error("Network response was not OK");
      return res.json();
    })
    .then(data => {
      console.log('success', data[0]);
      console.log('keys', Object.keys(data[0]));
      setKeys(() => Object.keys(data[0]))
      setData(data[0]);
    })
    .catch(err => {
      console.log("Error", err);
      setError(err);
    });
  };

  useEffect(() => {
    fetchData()
  },[])

  if (!keys) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-black">
          <tr>
            {keys.map((key, index) => (
              <th key={index} className="py-2 px-6">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-700">
          <tr className="bg-slate-100">
            {keys.map((key, index) => (
              <td key={index} className="py-2 px-6">{typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
