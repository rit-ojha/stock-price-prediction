package com.stockpredict.controller;

import org.springframework.web.bind.annotation.*;
import com.stockpredict.service.StockService;
import java.util.List;
//import com.stockpredict.entity.StockPrediction;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:5173")
public class StockController {
    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/{symbol}/predict")
    public List<Double> getPredictions(@PathVariable String symbol) {
        return stockService.predictStock(symbol);
    }
}
