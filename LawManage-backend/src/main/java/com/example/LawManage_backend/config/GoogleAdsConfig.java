package com.example.LawManage_backend.config;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.auth.oauth2.UserCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GoogleAdsConfig {

    @Value("${google.ads.developerToken}")
    private String developerToken;

    @Value("${google.ads.clientId}")
    private String clientId;

    @Value("${google.ads.clientSecret}")
    private String clientSecret;

    @Value("${google.ads.refreshToken}")
    private String refreshToken;

    @Value("${google.ads.loginCustomerId}")
    private long loginCustomerId;

    @Bean
    public GoogleAdsClient googleAdsClient() throws Exception {

        GoogleAdsClient.Builder builder = GoogleAdsClient.newBuilder()
                .setDeveloperToken(developerToken)
                .setLoginCustomerId(loginCustomerId);
        try {
            builder.setCredentials(UserCredentials.newBuilder()
                    .setClientId(clientId)
                    .setClientSecret(clientSecret)
                    .setRefreshToken(refreshToken)
                    .build());
            return builder.build();
        } catch (Exception e) {
            throw new Exception("Error creating google ads client", e);
        }
    }
}
    
