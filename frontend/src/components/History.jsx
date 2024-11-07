import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function History({ history, setHistory }) {
  const [filterHistory, setFilterHistory] = useState("");

  useEffect(() => {
    setFilterHistory(history);
  }, [history]);

  const handleDelete = async (id) => {
    try {
      // Perform the delete request
      const response = await axios.delete(
        `http://localhost:3000/api/sentiment/history/${id}`
      );
      console.log(response.data.message);

      // Remove the deleted item from the history list
      const updatedHistory = history.filter((item) => item._id !== id);
      setHistory(updatedHistory);

      // Display success toast
      toast.success(response.data.message, {
        autoClose: 3000,
      });
    } catch (error) {
      // Display error toast
      toast.error("Failed to delete entry", {
        autoClose: 3000,
      });
      console.error(error.message);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">History</h2>
      {filterHistory.length > 0 ? (
        filterHistory.map((entry) => (
          <div
            key={entry._id}
            className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            {/* Text Section */}
            <p className="text-gray-700 font-medium sm:mb-0 mb-2 w-full sm:w-[200px]">
              <span className="block sm:inline">Text:</span>{" "}
              <span className="font-normal">{entry.text}</span>
            </p>

            {/* Sentiment Section */}
            <p className="text-gray-600">
              <strong>Sentiment: </strong>
              <span
                className={`font-semibold ${
                  entry.sentiment.includes("Positive")
                    ? "text-green-500"
                    : entry.sentiment.includes("Negative")
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
              >
                {entry.sentiment}
              </span>
            </p>

            {/* Delete Button */}
            <button
              onClick={() => {
                handleDelete(entry._id);
              }}
              className="p-2 rounded-xl bg-red-500 text-white mt-2 sm:mt-0"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-mono">No history available!</p>
      )}
    </div>
  );
}

export default History;
