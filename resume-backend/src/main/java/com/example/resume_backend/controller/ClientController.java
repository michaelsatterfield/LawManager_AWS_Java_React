package com.example.resume_backend.controller;

import com.example.resume_backend.model.Client;
import com.example.resume_backend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// interacts with the service to perform CRUD operations on the Client entity.
// The controller class is annotated with @RestController, which indicates that this class is a REST controller.
// The @RequestMapping annotation is used to map the controller to the /api/Clients path.
// The controller class contains several methods that handle HTTP requests to perform CRUD operations on the Client entity.
@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService ClientService;

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(ClientService.getAllClients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        Optional<Client> Client = ClientService.getClientById(id);
        return Client.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client Client) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ClientService.createClient(Client));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client Client) {
        Client updatedClient = ClientService.updateClient(id, Client);
        return updatedClient != null ? ResponseEntity.ok(updatedClient) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        return ClientService.deleteClient(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    @GetMapping("/search")
    public ResponseEntity<List<Client>> searchClients(@RequestParam String name) {
        List<Client> Clients = ClientService.searchClientsByName(name);
        return ResponseEntity.ok(Clients);
    }
}

