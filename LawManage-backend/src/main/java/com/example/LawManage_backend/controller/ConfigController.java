package com.example.LawManage_backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @Value("${google.ads.customerId}")
    private String customerId;

    @GetMapping("/customer-id")
    public Map<String, String> getCustomerId() {
        return Map.of("customerId", customerId);
    }
}