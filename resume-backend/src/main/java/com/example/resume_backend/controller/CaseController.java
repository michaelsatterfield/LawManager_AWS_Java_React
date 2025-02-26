package com.example.resume_backend.controller;

import com.example.resume_backend.model.Cases;
import com.example.resume_backend.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cases")
public class CaseController {

    @Autowired
    private CaseService caseService;

    @GetMapping
    public List<Cases> getAllCases() {
        return caseService.getAllCases();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cases> getCaseById(@PathVariable Long id) {
        Cases caseDetails = caseService.getCaseById(id);
        if (caseDetails != null) {
            return ResponseEntity.ok(caseDetails);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/client/{clientId}")
    public List<Cases> getCasesByClientId(@PathVariable Long clientId) {
        return caseService.getCasesByClientId(clientId);
    }

    @PostMapping
    public ResponseEntity<Cases> createCase(@RequestBody Cases newCase) {
        Cases createdCase = caseService.createCase(newCase);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCase);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cases> updateCase(@PathVariable Long id, @RequestBody Cases updatedCase) {
        Cases caseToUpdate = caseService.updateCase(id, updatedCase);
        if (caseToUpdate != null) {
            return ResponseEntity.ok(caseToUpdate);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCase(@PathVariable Long id) {
        boolean deleted = caseService.deleteCase(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
