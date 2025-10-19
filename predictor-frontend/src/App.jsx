import React, { useState } from "react";
import StockSelector from "./components/StockSelector";
import StockChart from "./components/StockChart";
import { getStockPrediction } from "./services/api";

function App() {
  const [predictions, setPredictions] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelect = async (sym) => {
    setLoading(true);
    setSymbol(sym);
    try {
      const data = await getStockPrediction(sym);
      console.log("API Response:", data);
      setPredictions(data); // Backend returns array directly, not object
    } catch (error) {
      alert("Failed to fetch prediction!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-gray-800">
        📊 Stock Price Predictor
      </h1>
      <p className="text-gray-500 mt-2">
        Predict next 5 days of stock prices using AI
      </p>

      <StockSelector onSelect={handleSelect} />

      {loading ? (
        <p className="mt-10 text-gray-600">Predicting...</p>
      ) : (
        <StockChart predictions={predictions} />
      )}
    </div>
  );
}

export default App;
