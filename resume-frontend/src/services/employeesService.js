import apiClient from './apiClient';

const employeesService = {
  
  getAll: async () => {
    console.log(process.env.REACT_APP_API_URL);
    const response = await apiClient.get('/employees');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  },

  search: async (query) => {
    const response = await apiClient.get(`/employees/search`, { params: { name: query } });
    return response.data;
  },

  add: async (employeeData) => {
    const response = await apiClient.post('/employees', employeeData);
    return response.data;
  },

  update: async (id, updatedData) => {
    const response = await apiClient.put(`/employees/${id}`, updatedData);
    return response.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/employees/${id}`);
  }
};

export default employeesService;
