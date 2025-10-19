// src/main/java/com/stockpredict/service/StockService.java
package com.stockpredict.service;

import org.springframework.stereotype.Service;
import com.stockpredict.client.MLClient;
import com.stockpredict.dto.MLPredictionResponse;
import java.util.List;
//import com.stockpredict.entity.StockPrediction;
//import com.stockpredict.repository.StockPredictionRepository;

@Service
public class StockService {
    private final MLClient mlClient;
    // private final StockPredictionRepository repository;

    public StockService(MLClient mlClient) {
        this.mlClient = mlClient;
        //this.repository = repository;
    }

    public List<Double> predictStock(String symbol) {
        MLPredictionResponse response = mlClient.getPrediction(symbol);
        //return repository.save(prediction);
        return response.getPredictions();
    }
}
