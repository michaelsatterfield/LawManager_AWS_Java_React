package com.example.LawManage_backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "cases")
@Data
public class Cases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    private Long id;

    private String caseName;
    private String caseType;
    private String caseStatus;

    @Column(columnDefinition = "TEXT") // For long descriptions
    private String caseDescription;

    private LocalDate caseStartDate; // Use LocalDate for dates
    private LocalDate caseEndDate;
    private LocalDate caseClosedDate;
    private LocalDateTime caseCreatedDate; // Timestamps should use LocalDateTime
    private LocalDateTime caseUpdatedDate;

    private String casePriority; // String is fine (e.g., High, Medium, Low)

    private Long caseAssignedTo; // Store user ID instead of a String name
    private Long caseCreatedBy;
    private Long caseUpdatedBy;

    @Column(columnDefinition = "TEXT") // If it's long, use TEXT
    private String caseResolution;

    @Column(columnDefinition = "TEXT") // If comments are long
    private String caseComments;

    private String caseAttachment; // If storing a file path or URL

    private Long caseRelatedTo; // If linking to another case, store the ID
    private Long caseContact; // Store contact ID instead of a String
    private Long caseAccount;
    private Long caseOpportunity;
    private Long caseLead;
    private Long caseProduct;
    private Long caseAsset;
    private Long caseContract;
    private Long caseCampaign;
    private Long caseSolution;

    private String caseOrigin; // String is fine (e.g., "Phone", "Email")
    private String caseReason;
    private String caseSubject;

    private Long caseParent; // If linking to another case, store ID instead of String

    // Relationship with Client
    @ManyToOne
    @JoinColumn(name = "client_id") // Foreign key column in 'cases' table
    private Client client; // The client associated with this case
}
