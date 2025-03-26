import apiClient from './apiClient';

const casesService = {

  getAll: async () => {
    const response = await apiClient.get('/cases');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/cases/${id}`);
    return response.data;
  },

  getByClientId: async (clientId) => {
    const response = await apiClient.get(`/cases/client/${clientId}`);
    return response.data;
  },

  search: async (query) => {
    const response = await apiClient.get('/cases/search', { params: { query } }); // Send query as a single parameter
    return response.data;
  },

  add: async (caseData) => {
    const response = await apiClient.post('/cases', caseData);
    return response.data;
  },

  update: async (id, updatedData) => {
    const response = await apiClient.put(`/cases/${id}`, updatedData);
    return response.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/cases/${id}`);
  }
};

export default casesService;
