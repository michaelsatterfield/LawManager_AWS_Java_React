package com.example.LawManage_backend.controller;

import com.example.LawManage_backend.dto.LeadDTO;
import com.example.LawManage_backend.service.GoogleAdsService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GoogleAdsController {

    private final GoogleAdsService googleAdsService;

    public GoogleAdsController(GoogleAdsService googleAdsService) {
        this.googleAdsService = googleAdsService;
    }

    @Value("${google.ads.customerId}")
    private String customerId;

    // @GetMapping("/api/google-ads/leads")
    // public List<LeadDTO> getLeads(@RequestParam long customerId) throws Exception {
    //     return googleAdsService.getAllLeads(customerId);
    // }

    @GetMapping("/api/google-ads/leads")
    public List<LeadDTO> getLeads(@RequestParam(required = false) Long customerId) throws Exception {
        long effectiveCustomerId = (customerId != null) ? customerId : Long.parseLong(this.customerId);
        return googleAdsService.getAllLeads(effectiveCustomerId);
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
