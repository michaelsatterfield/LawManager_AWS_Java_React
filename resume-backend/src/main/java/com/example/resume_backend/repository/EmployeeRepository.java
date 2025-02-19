package com.example.resume_backend.repository;

import com.example.resume_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

// This interface extends JpaRepository, which provides CRUD operations for the Employee entity.
//JpaRepository provides several methods, like findAll(), findById(), save(), and deleteById(), which we will use in the service.
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
