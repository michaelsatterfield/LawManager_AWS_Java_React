package com.example.LawManage_backend.dto;

import lombok.Data;

@Data // Lombok annotation to generate getters, setters, toString, equals, and hashCode
public class LeadDTO {
    private String resourceName; // Maps to getResourceName()
    private long id; // Maps to getId()
    private String categoryId; // Maps to getCategoryId()
    private String serviceId; // Maps to getServiceId()
    private String phoneNumber; // Extracted from contact_details
    private String email; // Extracted from contact_details
    private String leadType; // Maps to getLeadType()
    private String leadStatus; // Maps to getLeadStatus()
    private String creationDateTime; // Maps to getCreationDateTime()
    private String locale; // Maps to getLocale()
    private String noteDescription; // Extracted from note
    private String noteEditDateTime; // Extracted from note
    private boolean leadCharged; // Maps to getLeadCharged()
    private String creditState; // Extracted from credit_details
}