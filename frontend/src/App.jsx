import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import History from "./components/History";
import TextInput from "./components/TextInput";

function App() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const response = await axios("http://localhost:3000/api/sentiment/history");
    console.log("Response coming from the server: ", response.data);
    setHistory(response.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Sentiment Analysis App
      </h1>
      <TextInput fetchHistory={fetchHistory} />
      <History history={history} setHistory={setHistory} />
      <ToastContainer />
    </div>
  );
}

export default App;
