# Stock Price Prediction API

A machine learning-powered REST API for predicting stock prices using LSTM neural networks. This application provides real-time stock price predictions through a Flask-based web service.

## 🚀 Features

- **LSTM-based Stock Prediction**: Uses Long Short-Term Memory neural networks for accurate price forecasting
- **RESTful API**: Clean HTTP endpoints for easy integration
- **Real-time Data**: Fetches live stock data using Yahoo Finance API
- **Multi-symbol Support**: Train and predict for any stock symbol
- **Error Handling**: Comprehensive error handling with meaningful HTTP status codes
- **Health Monitoring**: Built-in health check endpoint for service monitoring

## 🏗️ Architecture

```
ml-service/
├── app/
│   ├── __init__.py          # Python package initialization
│   ├── server.py            # Flask web server and API endpoints
│   ├── model_train.py       # LSTM model training pipeline
│   └── requirements.txt     # Python dependencies
├── models/                  # Trained model storage
│   └── AAPL.h5             # Example trained model
└── venv/                   # Virtual environment
```

## 📋 Prerequisites

- Python 3.7+
- pip (Python package installer)
- Virtual environment support

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd stock-price-prediction
```

### 2. Set Up Virtual Environment
```bash
cd ml-service
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r app/requirements.txt
```

## 🚀 Quick Start

### 1. Train a Model
```bash
cd app
python -c "from model_train import train_model; train_model('AAPL')"
```

### 2. Start the Server
```bash
python server.py
```

The server will start on `http://localhost:5000`

### 3. Test the API
```bash
# Health check
curl http://localhost:5000/health

# Get predictions
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symbol": "AAPL"}'
```

## 📚 API Documentation

### Endpoints

#### `GET /health`
Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "healthy",
  "message": "Server is running"
}
```

#### `POST /predict`
Predict stock prices for the next 5 days.

**Request Body:**
```json
{
  "symbol": "AAPL"
}
```

**Response:**
```json
{
  "symbol": "AAPL",
  "predictions": [150.25, 151.30, 152.15, 153.20, 154.10]
}
```

**Error Responses:**
- `400 Bad Request`: Missing or invalid symbol
- `404 Not Found`: Model not found or no data available
- `500 Internal Server Error`: Server-side processing error

## 🧠 Machine Learning Details

### Model Architecture
- **Type**: LSTM (Long Short-Term Memory) Neural Network
- **Input**: 60 days of historical closing prices
- **Output**: 5-day price predictions
- **Architecture**:
  - LSTM Layer 1: 50 units (return_sequences=True)
  - LSTM Layer 2: 50 units
  - Dense Layer: 5 units (output layer)

### Training Process
1. **Data Collection**: Downloads 180 days of historical data using yfinance
2. **Preprocessing**: Normalizes data using MinMaxScaler (0-1 range)
3. **Sequence Creation**: Creates 60-day input sequences with 5-day targets
4. **Training**: 10 epochs with Adam optimizer and MSE loss
5. **Model Saving**: Saves trained model as HDF5 file

### Data Pipeline
```
Raw Stock Data → Normalization → Sequence Creation → LSTM Training → Model Persistence
```

## 🔧 Configuration

### Model Training Parameters
- **Training Period**: 180 days
- **Sequence Length**: 60 days
- **Prediction Horizon**: 5 days
- **Epochs**: 10
- **Batch Size**: 32
- **Optimizer**: Adam
- **Loss Function**: Mean Squared Error

### Server Configuration
- **Host**: 0.0.0.0 (all interfaces)
- **Port**: 5000
- **Debug Mode**: Enabled
- **Data Period**: 90 days (for predictions)

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `flask` | Web framework for API |
| `yfinance` | Yahoo Finance data fetching |
| `pandas` | Data manipulation and analysis |
| `numpy` | Numerical computing |
| `scikit-learn` | Data preprocessing (MinMaxScaler) |
| `tensorflow` | Deep learning framework (LSTM) |

## 🧪 Testing

### Manual Testing
```bash
# Test health endpoint
curl http://localhost:5000/health

# Test prediction with valid symbol
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symbol": "AAPL"}'

# Test error handling - invalid symbol
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symbol": "INVALID"}'

# Test error handling - missing symbol
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Expected Test Results
- ✅ Health check returns 200 OK
- ✅ Valid predictions return 200 OK with price array
- ✅ Invalid symbols return 404 Not Found
- ✅ Missing symbols return 400 Bad Request

## 🚨 Error Handling

The API includes comprehensive error handling for:
- **Missing Request Data**: Returns 400 with descriptive message
- **Model Not Found**: Returns 404 when model file doesn't exist
- **Invalid Stock Symbol**: Returns 404 when no data is available
- **Server Errors**: Returns 500 with error details for debugging

## 🔮 Future Enhancements

- [ ] **Model Versioning**: Support for multiple model versions
- [ ] **Batch Predictions**: Predict multiple symbols in one request
- [ ] **Model Retraining**: Automated model retraining endpoints
- [ ] **Performance Metrics**: Model accuracy and performance tracking
- [ ] **Authentication**: API key-based authentication
- [ ] **Rate Limiting**: Request rate limiting for API protection
- [ ] **Docker Support**: Containerized deployment
- [ ] **Database Integration**: Persistent storage for predictions and models

## 📝 Usage Examples

### Python Client
```python
import requests

# Health check
response = requests.get('http://localhost:5000/health')
print(response.json())

# Get predictions
response = requests.post('http://localhost:5000/predict', 
                        json={'symbol': 'AAPL'})
predictions = response.json()
print(f"Next 5 days: {predictions['predictions']}")
```

### JavaScript Client
```javascript
// Health check
fetch('http://localhost:5000/health')
  .then(response => response.json())
  .then(data => console.log(data));

// Get predictions
fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({symbol: 'AAPL'})
})
.then(response => response.json())
.then(data => console.log(data.predictions));
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This application is for educational and research purposes only. Stock price predictions are inherently uncertain and should not be used as the sole basis for investment decisions. Always consult with financial professionals before making investment choices.

---

**Note**: Make sure to train models for the stock symbols you want to predict before making API calls. The system will return a 404 error if the requested model doesn't exist.