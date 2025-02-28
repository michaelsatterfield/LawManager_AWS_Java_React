package com.example.LawManage_backend.repository;

import com.example.LawManage_backend.model.Client;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// This interface extends JpaRepository, which provides CRUD operations for the Client entity.
//JpaRepository provides several methods, like findAll(), findById(), save(), and deleteById(), which we will use in the service.
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

   // Search for clients by matching query in either first or last name
   List<Client> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String firstName, String lastName);
}