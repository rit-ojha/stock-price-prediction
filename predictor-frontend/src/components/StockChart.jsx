import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer
  } from "recharts";
  
  export default function StockChart({ predictions }) {
    if (!predictions?.length) {console.log("No predictions:",predictions);  return null;}
    console.log("Predictions: ",predictions);
  
    const chartData = predictions.map((price, index) => ({
      day: `Day ${index + 1}`,
      price,
    }));
  
    return (
      <div className="mt-10 flex justify-center">
        <ResponsiveContainer width="90%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4f46e5"
              activeDot={{ r: 8 }}
              name="Predicted Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  