package com.example.LawManage_backend.service;


import com.example.LawManage_backend.model.Client;
import com.example.LawManage_backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    //new method to get all phone numbers of clients
       public List<String> getAllClientPhoneNumbers() {
        List<Client> clients = ClientRepository.findAll();
        return clients.stream()
                .map(Client::getPhone)
                .collect(Collectors.toList());
    }
 
    public List<Client> searchClientsByName(String query) {
        if (query != null) {
            // Search by first name or last name
            return ClientRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query);
        } else {
            return ClientRepository.findAll(); // Return all clients if no search query is provided
        }
    }

}
