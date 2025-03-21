// package com.example.LawManage_backend.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import java.util.List;
// import java.util.ArrayList;
// import java.util.Map;

// @Service
// public class LeadMatchingService {

//     @Autowired
//     private GoogleAdsService googleAdsService;

//     @Autowired
//     private ClientService clientService;

//     public List<String> getMatchingLeads(long customerId) throws Exception {
//         //List<String> leadPhoneNumbers = googleAdsService.getLeadPhoneNumbers(customerId);
//         List<Map<String, String>> allLeads = googleAdsService.getAllLeads(customerId);
//         List<String> leadPhoneNumbers = new ArrayList<>();
//         for (Map<String, String> lead : allLeads) {
//             if (lead.containsKey("PHONE")) {
//                 leadPhoneNumbers.add(lead.get("PHONE"));
//             }
//         }
//         List<String> clientPhoneNumbers = clientService.getAllClientPhoneNumbers();

//         List<String> matchingLeads = new ArrayList<>();
//         for (String leadPhoneNumber : leadPhoneNumbers) {
//             if (clientPhoneNumbers.contains(leadPhoneNumber)) {
//                 matchingLeads.add(leadPhoneNumber);
//             }
//         }
//         return matchingLeads;
//     }
//     public List<Map<String, String>> getAllLeads(long customerId) throws Exception {
//         return googleAdsService.getAllLeads(customerId);
//     }
// }
