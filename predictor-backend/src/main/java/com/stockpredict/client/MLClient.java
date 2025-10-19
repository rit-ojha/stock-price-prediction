package com.stockpredict.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import com.stockpredict.dto.MLPredictionResponse;
import java.util.Map;

@Component
public class MLClient {
    private final WebClient webClient;

    public MLClient(@Value("${ml.service.url}") String mlServiceUrl) {
        this.webClient = WebClient.builder().baseUrl(mlServiceUrl).build();
    }

    public MLPredictionResponse getPrediction(String symbol) {
        return webClient.post()
                .uri("/predict")
                .bodyValue(Map.of("symbol", symbol))
                .retrieve()
                .bodyToMono(MLPredictionResponse.class)
                .block();
    }
}
