package com.example.resume_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

// The Employee class represents an entity in the database.
// The class is annotated with @Entity, which indicates that this class is an entity.
// The class contains fields that represent the columns in the database table.
// The class also contains getters and setters for the fields.
// The class is used by the service and repository classes to interact with the database.
// The Employee class is a simple POJO (Plain Old Java Object) that represents an employee entity.
// The class contains fields for the employee's id, name, position, and salary.
@Entity
@Data
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto increment

    private Long id;
    private String name;
    private String position;
    private Double salary;
    
    // Getters and setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public String getPosition() {
//         return position;
//     }

//     public void setPosition(String position) {
//         this.position = position;
//     }

//     public Double getSalary() {
//         return salary;
//     }

//     public void setSalary(Double salary) {
//         this.salary = salary;
//     }
 }