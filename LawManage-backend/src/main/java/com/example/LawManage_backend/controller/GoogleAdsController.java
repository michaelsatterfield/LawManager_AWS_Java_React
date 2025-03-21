
package com.example.LawManage_backend.controller;

import com.example.LawManage_backend.service.GoogleAdsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/google-ads")
public class GoogleAdsController {

    private final GoogleAdsService googleAdsService;

    public GoogleAdsController(GoogleAdsService googleAdsService) {
        this.googleAdsService = googleAdsService;
    }

    @GetMapping("/leads")
    public List<Map<String, Object>> getLeads(@RequestParam long customerId) {
        try {
            return googleAdsService.getAllLeads(customerId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch leads: " + e.getMessage(), e);
        }
    }
}




// package com.example.LawManage_backend.controller;

// import com.example.LawManage_backend.service.LeadMatchingService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RestController;
// import java.util.List;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/leads")
// public class LeadController {

//     @Autowired
//     private LeadMatchingService leadMatchingService;

//     @GetMapping("/matching")
//     public List<String> getMatchingLeads(@RequestParam long customerId) throws Exception{
//         return leadMatchingService.getMatchingLeads(customerId);
//     }
//     @GetMapping
//     public List<Map<String, String>> getLeads(@RequestParam long customerId) throws Exception {
//         return leadMatchingService.getAllLeads(customerId);
//     }
// }
