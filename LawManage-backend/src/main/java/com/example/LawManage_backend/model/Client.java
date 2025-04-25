package com.example.LawManage_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

// The Client class represents an entity in the database.
@Entity
@Table(name = "clients") // Renaming the database table
@Data
public class Client {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto increment

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String dateOfBirth;
    private String city;
    private String state;
    private String contactType;
    private String leadSource;
    private String referredBy;

        // Relationship with Cases
     //   @OneToMany(mappedBy = "client") // "client" is the field in Cases
    //    private List<Cases> cases; // List of cases associated with this client

 }