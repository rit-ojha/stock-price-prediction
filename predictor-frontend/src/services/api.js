import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/stocks";

export const getStockPrediction = async (symbol) => {
  const response = await axios.get(`${API_BASE_URL}/${symbol}/predict`);
  console.log("Response: ",response.data);
  return response.data;
};
