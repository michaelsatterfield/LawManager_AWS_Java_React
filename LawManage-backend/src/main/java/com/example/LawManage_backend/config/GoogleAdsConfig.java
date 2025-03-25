package com.example.LawManage_backend.config;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v17.errors.GoogleAdsException;
import com.google.auth.oauth2.UserCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class GoogleAdsConfig {

    private static final Logger log = LoggerFactory.getLogger(GoogleAdsConfig.class);

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
        } catch (GoogleAdsException gae) {
            log.error("Google Ads API error: {}", gae.getMessage(), gae);
            if (gae.getMessage().contains("invalid_grant")) {
                log.error("The refresh token is invalid or expired. Please generate a new refresh token.");
            }
            throw new Exception("Google Ads exception: " + gae.getMessage(), gae);
        }
    }
}
    
