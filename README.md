# 📊 Stock Price Prediction System

A full-stack machine learning application for predicting stock prices using LSTM neural networks. Features a React frontend, Spring Boot backend, and Flask ML service with real-time predictions and interactive charts.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │ Spring Boot API │    │  Flask ML Service│
│   (Port 5173)   │◄──►│   (Port 8081)   │◄──►│   (Port 5000)   │
│                 │    │                 │    │                 │
│ • Stock Input   │    │ • REST API      │    │ • LSTM Models   │
│ • Interactive   │    │ • CORS Config   │    │ • Data Fetching │
│   Charts        │    │ • Error Handling│    │ • Predictions   │
│ • Tailwind CSS  │    │ • WebClient     │    │ • yfinance API  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Features

### Frontend (React + Vite)
- **Interactive UI**: Clean, responsive interface with Tailwind CSS
- **Real-time Charts**: Interactive line charts using Recharts
- **Stock Input**: Easy symbol entry with validation
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

### Backend (Spring Boot)
- **RESTful API**: Clean HTTP endpoints for frontend integration
- **CORS Support**: Cross-origin requests enabled
- **Service Layer**: Business logic separation
- **WebClient**: Reactive HTTP client for ML service communication
- **Error Propagation**: Proper error handling and status codes

### ML Service (Flask)
- **LSTM Models**: Long Short-Term Memory neural networks
- **Real-time Data**: Yahoo Finance integration via yfinance
- **Model Persistence**: Trained models saved as HDF5 files
- **Health Monitoring**: Built-in health check endpoint
- **Multi-symbol Support**: Train and predict for any stock symbol

## 📁 Project Structure

```
stock-price-prediction/
├── predictor-frontend/          # React Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── StockSelector.jsx
│   │   │   └── StockChart.jsx
│   │   ├── services/           # API services
│   │   │   └── api.js
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Tailwind CSS
│   ├── index.html             # HTML entry point
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind configuration
├── predictor-backend/          # Spring Boot Backend
│   ├── src/main/java/com/stockpredict/
│   │   ├── controller/        # REST controllers
│   │   │   └── StockController.java
│   │   ├── service/           # Business logic
│   │   │   └── StockService.java
│   │   ├── client/            # External service clients
│   │   │   └── MLClient.java
│   │   ├── dto/               # Data transfer objects
│   │   │   └── MLPredictionResponse.java
│   │   ├── config/            # Configuration classes
│   │   │   └── CorsConfig.java
│   │   └── PredictorBackendApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml                # Maven dependencies
├── ml-service/                # Flask ML Service
│   ├── app/
│   │   ├── server.py          # Flask web server
│   │   ├── model_train.py     # Model training pipeline
│   │   └── requirements.txt   # Python dependencies
│   ├── models/                # Trained models
│   │   └── AAPL.h5           # Example trained model
│   └── venv/                  # Python virtual environment
└── README.md                  # This file
```

## 🛠️ Prerequisites

- **Node.js 16+** (for React frontend)
- **Java 17+** (for Spring Boot backend)
- **Python 3.7+** (for Flask ML service)
- **Maven 3.6+** (for Spring Boot)
- **npm/yarn** (for React dependencies)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd stock-price-prediction
```

### 2. Start the ML Service
```bash
cd ml-service
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r app/requirements.txt

# Start the service
cd app
python server.py
```
**Expected output:** `Running on http://0.0.0.0:5000`

### 3. Start the Backend API
```bash
# In a new terminal
cd predictor-backend
./mvnw spring-boot:run
# or: mvn spring-boot:run
```
**Expected output:** `Started PredictorBackendApplication in X.XXX seconds`

### 4. Start the Frontend
```bash
# In a new terminal
cd predictor-frontend
npm install
npm run dev
```
**Expected output:** `Local: http://localhost:5173`

### 5. Access the Application
Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

1. **Enter Stock Symbol**: Type a stock symbol (e.g., "AAPL") in the input field
2. **Click Predict**: Click the "Predict" button to get predictions
3. **View Results**: See an interactive chart showing 5-day price predictions
4. **Try Different Symbols**: Enter other symbols for new predictions

## 📚 API Documentation

### Backend API Endpoints

#### `GET /api/stocks/{symbol}/predict`
Get 5-day stock price predictions for a given symbol.

**Example Request:**
```bash
curl http://localhost:8081/api/stocks/AAPL/predict
```

**Response:**
```json
[150.25, 151.30, 152.15, 153.20, 154.10]
```

### ML Service Endpoints

#### `GET /health`
Health check endpoint.

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

### Training a New Model
```bash
cd ml-service/app
python -c "from model_train import train_model; train_model('MSFT')"
```

## 🔧 Configuration

### Frontend Configuration
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Port**: 5173 (Vite default)

### Backend Configuration
- **Framework**: Spring Boot 3.5.6
- **Java Version**: 17
- **Port**: 8081
- **CORS**: Enabled for localhost:5173
- **ML Service URL**: http://localhost:5000

### ML Service Configuration
- **Framework**: Flask
- **Port**: 5000
- **Debug Mode**: Enabled
- **Data Period**: 90 days (for predictions)

## 📦 Dependencies

### Frontend Dependencies
| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `react-dom` | React DOM rendering |
| `axios` | HTTP client |
| `recharts` | Chart library |
| `tailwindcss` | CSS framework |
| `vite` | Build tool |

### Backend Dependencies
| Package | Purpose |
|---------|---------|
| `spring-boot-starter-web` | Web framework |
| `spring-boot-starter-webflux` | Reactive web client |
| `lombok` | Code generation |
| `spring-boot-starter-actuator` | Monitoring |

### ML Service Dependencies
| Package | Purpose |
|---------|---------|
| `flask` | Web framework |
| `yfinance` | Stock data fetching |
| `pandas` | Data manipulation |
| `numpy` | Numerical computing |
| `scikit-learn` | Data preprocessing |
| `tensorflow` | Deep learning framework |

## 🧪 Testing

### Frontend Testing
1. **UI Rendering**: Verify all components load correctly
2. **Input Validation**: Test empty and invalid inputs
3. **API Integration**: Test successful and failed API calls
4. **Chart Display**: Verify charts render with data
5. **Responsive Design**: Test on different screen sizes

### Backend Testing
```bash
# Test health endpoint
curl http://localhost:8081/actuator/health

# Test prediction endpoint
curl http://localhost:8081/api/stocks/AAPL/predict
```

### ML Service Testing
```bash
# Test health endpoint
curl http://localhost:5000/health

# Test prediction endpoint
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symbol": "AAPL"}'
```

## 🚨 Troubleshooting

### Common Issues

#### Frontend Issues
- **"React is not defined"**: Ensure React imports are present in all components
- **"Unknown at rule @tailwind"**: This is a CSS linter warning, can be ignored
- **CORS errors**: Ensure backend CORS configuration is correct

#### Backend Issues
- **"Lombok cannot be resolved"**: Run `mvn clean install` to refresh dependencies
- **404 from ML service**: Ensure ML service is running on port 5000
- **Port conflicts**: Check if ports 8081, 5173, or 5000 are already in use

#### ML Service Issues
- **"Model not found"**: Train a model first using `model_train.py`
- **"No data found"**: Check if stock symbol is valid and has trading data
- **Import errors**: Ensure all dependencies are installed in virtual environment

### Port Configuration
- **Frontend**: 5173 (Vite default)
- **Backend**: 8081 (Spring Boot)
- **ML Service**: 5000 (Flask)

## 🔮 Future Enhancements

### Frontend
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Multiple Charts**: Historical vs predicted data comparison
- [ ] **Time Range Selection**: Choose prediction periods
- [ ] **Portfolio View**: Track multiple stocks
- [ ] **Mobile App**: React Native version

### Backend
- [ ] **Authentication**: JWT-based user authentication
- [ ] **Rate Limiting**: API request throttling
- [ ] **Caching**: Redis for prediction caching
- [ ] **Database**: Persistent storage for predictions
- [ ] **Monitoring**: Prometheus metrics integration

### ML Service
- [ ] **Model Versioning**: Multiple model versions support
- [ ] **Auto-retraining**: Scheduled model updates
- [ ] **Ensemble Models**: Multiple model predictions
- [ ] **Feature Engineering**: Technical indicators integration
- [ ] **Real-time Updates**: WebSocket for live predictions

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

## 🎯 Quick Commands Reference

```bash
# Start all services
cd ml-service/app && python server.py &          # ML Service
cd predictor-backend && ./mvnw spring-boot:run & # Backend
cd predictor-frontend && npm run dev             # Frontend

# Test endpoints
curl http://localhost:5000/health                # ML Service health
curl http://localhost:8081/api/stocks/AAPL/predict # Backend API
open http://localhost:5173                       # Frontend app
```

**Happy Predicting! 📈**