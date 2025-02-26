package com.example.resume_backend.repository;

import com.example.resume_backend.model.Cases;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CaseRepository extends JpaRepository<Cases, Long> {
    List<Cases> findByClientId(Long clientId);  // Custom query to find cases by client ID
}