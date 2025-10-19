# app/server.py
from flask import Flask, request, jsonify
import yfinance as yf
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not request.json or 'symbol' not in request.json:
            return jsonify({'error': 'Symbol is required'}), 400
        
        symbol = request.json['symbol']
        
        # Check if model exists
        import os
        model_path = f'models/{symbol}.h5'
        if not os.path.exists(model_path):
            return jsonify({'error': f'Model for {symbol} not found. Please train the model first.'}), 404
        
        model = load_model(model_path)
        df = yf.download(symbol, period='90d', interval='1d')

        if df.empty:
            return jsonify({'error': f'No data found for symbol {symbol}'}), 404

        data = df[['Close']].values
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(data)

        last_60 = scaled_data[-60:]
        pred_input = np.expand_dims(last_60, axis=0)
        preds = model.predict(pred_input)
        preds = scaler.inverse_transform(preds).flatten().tolist()

        return jsonify({
            "symbol": symbol,
            "predictions": preds
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'message': 'Server is running'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)