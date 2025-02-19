package com.example.resume_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example.resume_backend")
@EnableJpaRepositories(basePackages = "com.example.resume_backend.repository")
public class ResumeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResumeBackendApplication.class, args);
    }
}