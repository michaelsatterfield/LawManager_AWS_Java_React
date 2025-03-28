package com.example.LawManage_backend.service;

import com.example.LawManage_backend.dto.LeadDTO; // Ensure this import is present
import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v19.errors.GoogleAdsException;
import com.google.ads.googleads.v19.services.GoogleAdsRow;
import com.google.ads.googleads.v19.services.GoogleAdsServiceClient;
import com.google.ads.googleads.v19.services.SearchGoogleAdsStreamRequest;
import com.google.ads.googleads.v19.services.SearchGoogleAdsStreamResponse;
import com.google.api.gax.rpc.ServerStream;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GoogleAdsService {

    private final GoogleAdsClient googleAdsClient;

    public GoogleAdsService(GoogleAdsClient googleAdsClient) {
        this.googleAdsClient = googleAdsClient;
    }

    public List<LeadDTO> getAllLeads(long customerId) throws Exception {
        List<LeadDTO> allLeads = new ArrayList<>(); // Initialize the list of leads
        try (GoogleAdsServiceClient googleAdsServiceClient = googleAdsClient.getLatestVersion().createGoogleAdsServiceClient()) {
            // Construct a query to retrieve all leads
            String query = "SELECT local_services_lead.category_id, local_services_lead.contact_details, " +
             "local_services_lead.creation_date_time, local_services_lead.credit_details.credit_state," +
             "local_services_lead.lead_charged, local_services_lead.lead_status, local_services_lead.lead_type," +
              "local_services_lead.note.description, local_services_lead.note.edit_date_time," +
            "local_services_lead.resource_name FROM local_services_lead WHERE local_services_lead.lead_status != 'WIPED_OUT' ORDER BY local_services_lead.creation_date_time DESC";

            SearchGoogleAdsStreamRequest request = SearchGoogleAdsStreamRequest.newBuilder()
                    .setCustomerId(String.valueOf(customerId))
                    .setQuery(query)
                    .build();

            ServerStream<SearchGoogleAdsStreamResponse> stream =
                    googleAdsServiceClient.searchStreamCallable().call(request);

                    for (SearchGoogleAdsStreamResponse response : stream) {
                        for (GoogleAdsRow row : response.getResultsList()) {
                            LeadDTO lead = new LeadDTO();
                    
                            lead.setResourceName(row.getLocalServicesLead().getResourceName());
                            lead.setId(row.getLocalServicesLead().getId());
                            lead.setCategoryId(row.getLocalServicesLead().getCategoryId());
                            lead.setServiceId(row.getLocalServicesLead().getServiceId());
                            lead.setLeadType(row.getLocalServicesLead().getLeadType().name());
                            lead.setLeadStatus(row.getLocalServicesLead().getLeadStatus().name());
                            lead.setCreationDateTime(row.getLocalServicesLead().getCreationDateTime());
                            lead.setLocale(row.getLocalServicesLead().getLocale());
                            lead.setLeadCharged(row.getLocalServicesLead().getLeadCharged());
                          
                            if (row.getLocalServicesLead().hasContactDetails()) {
                                lead.setPhoneNumber(row.getLocalServicesLead().getContactDetails().getPhoneNumber());
                                lead.setEmail(row.getLocalServicesLead().getContactDetails().getEmail());
                                String[] parts = row.getLocalServicesLead().getResourceName().split("/");
                                lead.setLeadId(parts[parts.length - 1]);
                            }

                            if (row.getLocalServicesLead().hasNote()) {
                                lead.setNoteDescription(row.getLocalServicesLead().getNote().getDescription());
                                lead.setNoteEditDateTime(row.getLocalServicesLead().getNote().getEditDateTime());
                            }
                    
                            // Extract creditState from creditDetails
                            if (row.getLocalServicesLead().hasCreditDetails()) {
                                lead.setCreditState(row.getLocalServicesLead().getCreditDetails().getCreditState().name());
                            }
                    
                            allLeads.add(lead);
                        }
                    }
            return allLeads;
        } catch (GoogleAdsException gae) {
            throw new Exception("Google Ads exception: " + gae.getMessage(), gae);
        }
    }
}