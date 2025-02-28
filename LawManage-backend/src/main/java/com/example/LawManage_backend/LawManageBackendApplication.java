package com.example.LawManage_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example.LawManage_backend")
@EnableJpaRepositories(basePackages = "com.example.LawManage_backend.repository")
public class LawManageBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LawManageBackendApplication.class, args);
    }
}