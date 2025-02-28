package com.example.LawManage_backend.service;

import com.example.LawManage_backend.model.Cases;
import com.example.LawManage_backend.model.Client;
import com.example.LawManage_backend.repository.CaseRepository;
import com.example.LawManage_backend.repository.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaseService {

    @Autowired
    private CaseRepository caseRepository;  // Injecting the repository

     @Autowired
    private ClientRepository clientRepository;  // Injecting the repository

    public List<Cases> getAllCases() {
        return caseRepository.findAll();  // Fetch all cases from the database
    }

    public Cases getCaseById(Long id) {
        Optional<Cases> caseOptional = caseRepository.findById(id);
        return caseOptional.orElse(null);  // Return case or null if not found
    }

    public List<Cases> getCasesByClientId(Long clientId) {
        return caseRepository.findByClientId(clientId);  // Fetch cases by client ID
    }

    public List<Cases> getCasesForClient(Long clientId) {
        return caseRepository.findByClientId(clientId); // Custom query to fetch cases by client ID
    }

    
    public Cases createCase(Cases newCase) {
        // Ensure client exists before saving the case
        if (newCase.getClient() != null && newCase.getClient().getId() != null) {
            // Fetch the client by its ID
            Client client = clientRepository.findById(newCase.getClient().getId())
                                           .orElseThrow(() -> new RuntimeException("Client not found"));
            // Set the client object on the case
            newCase.setClient(client);
        }
    
        // Save and return the case with the associated client
        return caseRepository.save(newCase);
    }
    

    public Cases updateCase(Long id, Cases updatedCase) {
        Optional<Cases> existingCase = caseRepository.findById(id);
        if (existingCase.isPresent()) {
            Cases caseToUpdate = existingCase.get();
            caseToUpdate.setCaseName(updatedCase.getCaseName());
            // Set other fields here...
            return caseRepository.save(caseToUpdate);  // Save the updated case
        }
        return null;  // Return null if case not found
    }

    public boolean deleteCase(Long id) {
        Optional<Cases> caseOptional = caseRepository.findById(id);
        if (caseOptional.isPresent()) {
            caseRepository.delete(caseOptional.get());  // Delete the case
            return true;
        }
        return false;  // Return false if case not found
    }
}
