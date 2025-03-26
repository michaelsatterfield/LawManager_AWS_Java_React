import apiClient from './apiClient';

const leadService = { 
  getAll: async () => {
    const response = await apiClient.get('/google-ads/leads');
    return response.data;
  }
};

export default leadService;