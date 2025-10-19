import React, { useState } from "react";

export default function StockSelector({ onSelect }) {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim()) onSelect(symbol.toUpperCase());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-2 mt-8"
    >
      <input
        type="text"
        placeholder="Enter stock symbol (e.g. AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="border p-2 rounded w-60"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Predict
      </button>
    </form>
  );
}
