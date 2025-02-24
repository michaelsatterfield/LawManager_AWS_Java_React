import apiClient from './apiClient';

const clientsService = {
  
  getAll: async () => {
    console.log(process.env.REACT_APP_API_URL);
    const response = await apiClient.get('/clients');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/clients/${id}`);
    return response.data;
  },

  search: async (query) => {
    const response = await apiClient.get(`/clients/search`, { params: { query } });  // Send query as a single parameter
    return response.data;
  },

  add: async (clientData) => {
    const response = await apiClient.post('/clients', clientData);
    return response.data;
  },

  update: async (id, updatedData) => {
    const response = await apiClient.put(`/clients/${id}`, updatedData);
    return response.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/clients/${id}`);
  }
};

export default clientsService;
