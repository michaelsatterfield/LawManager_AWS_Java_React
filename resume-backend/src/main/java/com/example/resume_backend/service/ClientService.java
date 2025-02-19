package com.example.resume_backend.service;


import com.example.resume_backend.model.Client;
import com.example.resume_backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//service class that will interact with the repository and contain the business logic. 
//we can add filtering logic or any other business logic here.
@Service
public class ClientService {
    
    @Autowired
    private ClientRepository ClientRepository;
    
    public List<Client> getAllClients() {
        return ClientRepository.findAll();
    }

    public Optional<Client> getClientById(Long id) {
        return ClientRepository.findById(id);
    }

    public Client createClient(Client Client) {
        return ClientRepository.save(Client);
    }

    public Client updateClient(Long id, Client Client) {
        if (ClientRepository.existsById(id)) {
            Client.setId(id);
            return ClientRepository.save(Client);
        }
        return null;
    }

    public boolean deleteClient(Long id) {
        if (ClientRepository.existsById(id)) {
            ClientRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public List<Client> searchClientsByName(String name) {
        return ClientRepository.findByNameContainingIgnoreCase(name);
    } 

}
