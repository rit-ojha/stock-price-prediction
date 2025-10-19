package com.stockpredict.dto;

import java.util.List;
import lombok.Data;

@Data
public class MLPredictionResponse {
    private String symbol;
    private List<Double> predictions;

    // public String getSymbol() {
    //     return symbol;
    // }

    // public List<Double> getPredictions() {
    //     return predictions;
    // }
}
