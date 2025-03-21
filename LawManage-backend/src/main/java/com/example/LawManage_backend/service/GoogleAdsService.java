package com.example.LawManage_backend.service;

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
import java.util.Map;
import java.util.HashMap;

@Service
public class GoogleAdsService {

    private final GoogleAdsClient googleAdsClient;

    public GoogleAdsService(GoogleAdsClient googleAdsClient) {
        this.googleAdsClient = googleAdsClient;
    }

    public List<Map<String, Object>> getAllLeads(long customerId) throws Exception {
        List<Map<String, Object>> allLeads = new ArrayList<>();
        try (GoogleAdsServiceClient googleAdsServiceClient = googleAdsClient.getLatestVersion().createGoogleAdsServiceClient()) {
            String query = "SELECT local_services_lead.category_id, local_services_lead.contact_details, " +
                            "local_services_lead.creation_date_time, local_services_lead.credit_details.credit_state, " +
                            "local_services_lead.lead_charged, local_services_lead.lead_status, " +
                            "local_services_lead.lead_type, local_services_lead.note.description, " +
                            "local_services_lead.note.edit_date_time, local_services_lead.resource_name " +
                            "FROM local_services_lead WHERE local_services_lead.lead_status != 'WIPED_OUT' " +
                            "ORDER BY local_services_lead.creation_date_time DESC";

            SearchGoogleAdsStreamRequest request = SearchGoogleAdsStreamRequest.newBuilder()
                    .setCustomerId(String.valueOf(customerId))
                    .setQuery(query)
                    .build();

            ServerStream<SearchGoogleAdsStreamResponse> stream =
                    googleAdsServiceClient.searchStreamCallable().call(request);

            for (SearchGoogleAdsStreamResponse response : stream) {
                for (GoogleAdsRow row : response.getResultsList()) {
                    Map<String, Object> stringKeyedMap = new HashMap<>();
                    row.toBuilder().build().getAllFields().forEach((key, value) -> 
                        stringKeyedMap.put(key.getName(), value)
                    );
                    allLeads.add(stringKeyedMap);
                }
            }
            return allLeads;
        } catch (GoogleAdsException gae) {
            throw new Exception("Google Ads exception: " + gae.getMessage(), gae);
        }
    }
}
